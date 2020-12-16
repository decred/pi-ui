import React from "react";
import PropTypes from "prop-types";
import {
  SelectOptions,
  SelectControls,
  defaultLabelKeyGetter,
  defaultValueKeyGetter
} from "../helpers";
import { useMultiSelect } from "./hooks";
import { classNames } from "../../../utils";
import styles from "../styles.css";
import multiStyles from "./styles.css";
import { animated } from "react-spring";

const MultiSelectOptions = ({
  disabled,
  value,
  valueRenderer,
  getOptionLabel,
  removeSelectedOption
}) => (
  <div
    className={classNames(
      multiStyles.values,
      disabled && multiStyles.disabled
    )}>
    {value.length > 0 &&
      value.map((selectedOption, index) => (
        <div className={multiStyles.selectedOption} key={index}>
          {valueRenderer
            ? valueRenderer(selectedOption)
            : getOptionLabel(selectedOption)}
          <div
            className={multiStyles.removeOption}
            onClick={(e) => removeSelectedOption(e, selectedOption)}
          />
        </div>
      ))}
  </div>
);

MultiSelectOptions.propTypes = {
  disabled: PropTypes.bool,
  getOptionLabel: PropTypes.func,
  valueRenderer: PropTypes.func,
  value: PropTypes.array,
  removeSelectedOption: PropTypes.func.isRequired
};

MultiSelectOptions.defaultProps = {
  disabled: false,
  getOptionLabel: defaultLabelKeyGetter,
  valueRenderer: null,
  value: []
};

const MultiSelect = ({
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
    removeSelectedOption,
    onSearch,
    transitions
  } = useMultiSelect(
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
    onInputChange
  );

  const parentClassNames = classNames(
    styles.select,
    value.length && styles.valueSelected,
    searchable && inputValue && styles.search,
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
          {searchable && inputValue ? (
            <input
              disabled={disabled}
              className={styles.input}
              value={inputValue}
              onChange={onSearch}
              autoFocus
            />
          ) : (
            <MultiSelectOptions
              disabled={disabled}
              value={value}
              valueRenderer={valueRenderer}
              getOptionLabel={getOptionLabel}
              removeSelectedOption={removeSelectedOption}
            />
          )}
          <SelectControls
            clearable={clearable}
            cancelSelection={cancelSelection}
            valueSelected={value.length}
            disabled={disabled}
            separator={separator}
            menuOpened={menuOpened}
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
    </div>
  );
};

MultiSelect.propTypes = {
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  options: PropTypes.array,
  label: PropTypes.string,
  separator: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  optionRenderer: PropTypes.func,
  valueRenderer: PropTypes.func,
  optionsFilter: PropTypes.func,
  className: PropTypes.string,
  autoFocus: PropTypes.bool,
  searchable: PropTypes.bool,
  value: PropTypes.array,
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func
};

MultiSelect.defaultProps = {
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
  value: [],
  inputValue: "",
  onInputChange: null
};

export default MultiSelect;
