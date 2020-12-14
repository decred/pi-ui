import React from "react";
import PropTypes from "prop-types";
import { blankValue } from "../helpers";
import { useAsyncSelect } from "./hooks";
import { classNames } from "../../../utils";
import styles from "./styles.css";
import { animated, useTransition } from "react-spring";

const AsyncSelect = ({
  disabled,
  clearable,
  options,
  label,
  separator,
  getOptionLabel,
  getOptionValue,
  optionRenderer,
  valueRenderer,
  className,
  autoFocus,
  value,
  onChange,
  inputValue,
  onInputChange,
  defaultOptions,
  cacheOptions,
  loadOptions,
  loadingMessage,
  ...props
}) => {
  const {
    _options,
    containerRef,
    menuOpened,
    focusedOptionIndex,
    openMenu,
    setFocusedOptionIndex,
    getValueKey,
    getLabelKey,
    selectOption,
    cancelSelection,
    onSearch,
    loading
  } = useAsyncSelect(
    disabled,
    autoFocus,
    onChange,
    options,
    getOptionLabel,
    getOptionValue,
    inputValue,
    onInputChange,
    defaultOptions,
    cacheOptions,
    loadOptions
  );

  const parentClassNames = classNames(
    styles.select,
    getValueKey(value) && styles.valueSelected,
    inputValue && styles.search,
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
          {inputValue ? (
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
                (valueRenderer ? valueRenderer(value) : getLabelKey(value))}
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
                {!loading ? (
                  _options.map((_option, index) => (
                    <div
                      onClick={selectOption}
                      onMouseEnter={() => setFocusedOptionIndex(index)}
                      key={index}
                      index={index}
                      className={classNames(
                        index === focusedOptionIndex && styles.focusedOption,
                        getValueKey(value) === getValueKey(_option) &&
                          styles.selected
                      )}>
                      {_option !== blankValue &&
                        (optionRenderer
                          ? optionRenderer(_option)
                          : getLabelKey(_option))}
                    </div>
                  ))
                ) : (
                  <div className={styles.loadingMessage}>{loadingMessage}</div>
                )}
              </animated.div>
            )
        )}
      </div>
    </div>
  );
};

AsyncSelect.propTypes = {
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  options: PropTypes.array,
  label: PropTypes.string,
  separator: PropTypes.bool,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  optionRenderer: PropTypes.func,
  valueRenderer: PropTypes.func,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func,
  defaultOptions: PropTypes.oneOf([PropTypes.array, PropTypes.bool]),
  cacheOptions: PropTypes.bool,
  loadOptions: PropTypes.func,
  loadingMessage: PropTypes.string
};

AsyncSelect.defaultProps = {
  disabled: false,
  clearable: false,
  options: [],
  label: "",
  separator: false,
  getOptionLabel: null,
  getOptionValue: null,
  optionRenderer: null,
  valueRenderer: null,
  className: "",
  autoFocus: false,
  value: blankValue,
  inputValue: "",
  onInputChange: null,
  defaultOptions: false,
  cacheOptions: false,
  loadOptions: null,
  loadingMessage: "Loading..."
};

export default AsyncSelect;
