import React from "react";
import PropTypes from "prop-types";
import {
  blankValue,
  defaultLabelKeyGetter,
  defaultValueKeyGetter
} from "../helpers";
import { useBasicSelect } from "./hooks";
import { classNames } from "../../../utils";
import styles from "./styles.css";
import { animated, useTransition } from "react-spring";

const BasicSelect = ({
  disabled,
  clearable,
  options,
  label,
  separator,
  getOptionLabel,
  getOptionValue,
  optionRenderer,
  valueRenderer,
  optionsFilter,
  className,
  autoFocus,
  searchable,
  value,
  onChange,
  inputValue,
  onInputChange,
  ...props
}) => {
  const {
    _options,
    containerRef,
    menuOpened,
    focusedOptionIndex,
    openMenu,
    setFocusedOptionIndex,
    selectOption,
    cancelSelection,
    onSearch
  } = useBasicSelect(
    disabled,
    autoFocus,
    onChange,
    options,
    getOptionLabel,
    getOptionValue,
    optionsFilter,
    value,
    searchable,
    inputValue,
    onInputChange
  );

  const parentClassNames = classNames(
    styles.select,
    getOptionValue(value) && styles.valueSelected,
    searchable && inputValue && styles.search,
    menuOpened ? styles.menuOpened : styles.menuClosed,
    separator && styles.hasSeparator,
    clearable && styles.clearable,
    disabled && styles.disabled,
    className
  );

  const transitions = useTransition(menuOpened, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    duration: 100
  });

  return (
    <div className={parentClassNames} {...props}>
      <div className={styles.fieldset} ref={containerRef}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.controls} onClick={openMenu}>
          {searchable && inputValue ? (
            <input
              disabled={disabled}
              className={styles.input}
              value={inputValue}
              onChange={onSearch}
              autoFocus
            />
          ) : (
            <div className={styles.value}>
              {value !== blankValue &&
                (valueRenderer ? valueRenderer(value) : getOptionLabel(value))}
            </div>
          )}
          {clearable && (
            <div className={styles.clear} onClick={cancelSelection} />
          )}
          {separator && <span className={styles.separator} />}
          <div className={styles.arrowContainer}>
            <div className={styles.arrow} />
          </div>
        </div>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div className={styles.menu} key={key} style={props}>
                {_options.map((_option, index) => (
                  <div
                    onClick={selectOption}
                    onMouseEnter={() => setFocusedOptionIndex(index)}
                    key={index}
                    index={index}
                    className={classNames(
                      index === focusedOptionIndex && styles.focusedOption,
                      getOptionValue(value) === getOptionValue(_option) &&
                        styles.selected
                    )}>
                    {_option !== blankValue &&
                      (optionRenderer
                        ? optionRenderer(_option)
                        : getOptionLabel(_option))}
                  </div>
                ))}
              </animated.div>
            )
        )}
      </div>
    </div>
  );
};

BasicSelect.propTypes = {
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  options: PropTypes.array,
  label: PropTypes.string,
  separator: PropTypes.bool,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  optionRenderer: PropTypes.func,
  valueRenderer: PropTypes.func,
  optionsFilter: PropTypes.func,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  searchable: PropTypes.bool,
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func
};

BasicSelect.defaultProps = {
  disabled: false,
  clearable: false,
  options: [],
  label: "",
  separator: false,
  getOptionLabel: defaultLabelKeyGetter,
  getOptionValue: defaultValueKeyGetter,
  optionRenderer: null,
  valueRenderer: null,
  optionsFilter: null,
  className: "",
  autoFocus: false,
  searchable: false,
  value: blankValue,
  inputValue: "",
  onInputChange: null
};

export default BasicSelect;
