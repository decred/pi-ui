import React from "react";
import PropTypes from "prop-types";
import {
  blankValue,
  defaultLabelKeyGetter,
  defaultValueKeyGetter,
  defaultPromptTextCreator
} from "../helpers";
import { useCreatableSelect } from "./hooks";
import { classNames } from "../../../utils";
import styles from "./styles.css";
import { animated, useTransition } from "react-spring";
import Icon from "../../Icon/Icon.jsx";

const CreatableSelect = ({
  disabled,
  clearable,
  options,
  label,
  separator,
  onChange,
  getOptionLabel,
  getOptionValue,
  optionRenderer,
  optionsFilter,
  className,
  autoFocus,
  searchable,
  value,
  inputValue,
  onInputChange,
  typeLabel,
  error,
  isValidNewOption,
  newOptionCreator,
  promptTextCreator,
  ...props
}) => {
  const {
    _options,
    containerRef,
    menuOpened,
    focusedOptionIndex,
    openMenu,
    showError,
    setFocusedOptionIndex,
    selectOption,
    cancelSelection,
    onSearch
  } = useCreatableSelect(
    disabled,
    autoFocus,
    onChange,
    options,
    getOptionLabel,
    getOptionValue,
    optionsFilter,
    searchable,
    value,
    inputValue,
    onInputChange,
    typeLabel,
    isValidNewOption,
    newOptionCreator,
    promptTextCreator
  );

  const parentClassNames = classNames(
    styles.select,
    getOptionValue(value) && styles.valueSelected,
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
      <div
        className={classNames(styles.fieldset, showError && styles.error)}
        ref={containerRef}>
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
              {value !== blankValue && getOptionLabel(value)}
            </div>
          )}
          {clearable && (
            <div className={styles.clear} onClick={cancelSelection} />
          )}
          {error && showError && (
            <Icon
              type="alert"
              backgroundColor="#ed6d47"
              iconColor="#feb8a5"
              className={classNames(styles.errorIcon, styles.errorIconActive)}
            />
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
      {error && showError && (
        <p className={classNames(styles.errorMsg, styles.errorMsgActive)}>
          {error}
        </p>
      )}
    </div>
  );
};

CreatableSelect.propTypes = {
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  options: PropTypes.array,
  label: PropTypes.string,
  separator: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  optionRenderer: PropTypes.func,
  optionsFilter: PropTypes.func,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  searchable: PropTypes.bool,
  value: PropTypes.object.isRequired,
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  typeLabel: PropTypes.string,
  error: PropTypes.string,
  isValidNewOption: PropTypes.func,
  newOptionCreator: PropTypes.func,
  promptTextCreator: PropTypes.func
};

CreatableSelect.defaultProps = {
  disabled: false,
  clearable: false,
  options: [],
  label: "",
  separator: false,
  getOptionLabel: defaultLabelKeyGetter,
  getOptionValue: defaultValueKeyGetter,
  optionRenderer: null,
  optionsFilter: null,
  className: "",
  autoFocus: false,
  searchable: false,
  value: blankValue,
  inputValue: "",
  typeLabel: "Type to add a new option",
  error: "",
  isValidNewOption: null,
  newOptionCreator: null,
  promptTextCreator: defaultPromptTextCreator
};

export default CreatableSelect;
