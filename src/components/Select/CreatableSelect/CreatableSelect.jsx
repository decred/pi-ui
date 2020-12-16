import React from "react";
import PropTypes from "prop-types";
import {
  SelectOptions,
  SelectControls,
  blankValue,
  defaultLabelKeyGetter,
  defaultValueKeyGetter,
  defaultPromptTextCreator
} from "../helpers";
import { useCreatableSelect } from "./hooks";
import { classNames } from "../../../utils";
import styles from "../styles.css";
import creatableStyles from "./styles.css";
import { animated } from "react-spring";

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
    onSearch,
    transitions
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

  return (
    <div className={parentClassNames} {...props}>
      <div
        className={classNames(
          styles.fieldset,
          showError && creatableStyles.error
        )}
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
          <SelectControls
            clearable={clearable}
            cancelSelection={cancelSelection}
            valueSelected={getOptionValue(value)}
            disabled={disabled}
            separator={separator}
            menuOpened={menuOpened}
            error={error}
            showError={showError}
          />
        </div>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div className={styles.menu} key={key} style={props}>
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
              </animated.div>
            )
        )}
      </div>
      {error && showError && (
        <p
          className={classNames(
            creatableStyles.errorMsg,
            creatableStyles.errorMsgActive
          )}>
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
