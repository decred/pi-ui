import React from "react";
import PropTypes from "prop-types";
import {
  SelectOptions,
  SelectControls,
  blankValue,
  defaultLabelKeyGetter,
  defaultValueKeyGetter
} from "../helpers";
import { useAsyncSelect } from "./hooks";
import { classNames } from "../../../utils";
import styles from "../styles.css";
import asyncStyles from "./styles.css";
import { animated } from "react-spring";

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
    selectOption,
    cancelSelection,
    onSearch,
    loading,
    transitions
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
    getOptionValue(value) && styles.valueSelected,
    inputValue && styles.search,
    menuOpened ? styles.menuOpened : styles.menuClosed,
    separator && styles.hasSeparator,
    clearable && styles.clearable,
    disabled && styles.disabled,
    className
  );

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
                (valueRenderer ? valueRenderer(value) : getOptionLabel(value))}
            </div>
          )}
          <SelectControls
            clearable={clearable}
            cancelSelection={cancelSelection}
            valueSelected={getOptionValue(value)}
            disabled={disabled}
            separator={separator}
            menuOpened={menuOpened}
          />
        </div>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div className={styles.menu} key={key} style={props}>
                {!loading ? (
                  <SelectOptions
                    options={_options}
                    value={value}
                    selectOption={selectOption}
                    focusedOptionIndex={focusedOptionIndex}
                    setFocusedOptionIndex={setFocusedOptionIndex}
                    optionRenderer={optionRenderer}
                    getOptionLabel={getOptionLabel}
                    getOptionValue={getOptionValue}
                  />
                ) : (
                  <div className={asyncStyles.loadingMessage}>
                    {loadingMessage}
                  </div>
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
  defaultOptions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
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
  getOptionLabel: defaultLabelKeyGetter,
  getOptionValue: defaultValueKeyGetter,
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
