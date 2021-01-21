import React from "react";
import { classNames } from "../../utils";
import styles from "./styles.css";
import {
  SelectOptions,
  SelectFooter,
  blankValue,
  defaultLabelKeyGetter,
  defaultValueKeyGetter
} from "./helpers";
import { animated } from "react-spring";
import PropTypes from "prop-types";
import { useSelect } from "./hooks";
import isString from "lodash/isString";

const Select = ({
  children,
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
  isValid,
  error,
  noOptionsMessage,
  maxMenuHeight,
  ...props
}) => {
  const {
    containerRef,
    menuOpened,
    openMenu,
    transition,
    selectOption,
    focusedOptionIndex,
    setFocusedOptionIndex,
    cancelSelection,
    onSearch,
    currentOptions,
    setCurrentOptions,
    setOption,
    setMenuOpened,
    resetMenu,
    removeSelectedOptionFilter,
    onTypeArrowDownHandler,
    onTypeArrowUpHandler,
    onTypeDefaultHandler,
    invalidNewOption,
    setInvalidNewOption
  } = useSelect(
    value,
    disabled,
    getOptionLabel,
    getOptionValue,
    autoFocus,
    onChange,
    inputValue,
    onInputChange,
    searchable
  );

  const { Loading, Input, Controls, condition } = children({
    containerRef,
    menuOpened,
    openMenu,
    transition,
    selectOption,
    focusedOptionIndex,
    setFocusedOptionIndex,
    cancelSelection,
    onSearch,
    currentOptions,
    setCurrentOptions,
    setOption,
    setMenuOpened,
    resetMenu,
    removeSelectedOptionFilter,
    disabled,
    clearable,
    options,
    separator,
    getOptionLabel,
    getOptionValue,
    valueRenderer,
    optionsFilter,
    searchable,
    value,
    onChange,
    inputValue,
    onInputChange,
    className,
    onTypeArrowDownHandler,
    onTypeArrowUpHandler,
    onTypeDefaultHandler,
    invalidNewOption,
    setInvalidNewOption,
    isValid,
    noOptionsMessage
  });

  const valueSelectedCondition = Array.isArray(value)
    ? value.length
    : getOptionLabel(value);

  const showError = invalidNewOption || !isValid;

  const parentClassNames = classNames(
    styles.select,
    valueSelectedCondition && styles.valueSelected,
    searchable && inputValue && styles.search,
    menuOpened ? styles.menuOpened : styles.menuClosed,
    separator && styles.hasSeparator,
    clearable && styles.clearable,
    disabled && styles.disabled,
    showError && styles.error,
    className
  );

  const menuHeight = isString(maxMenuHeight)
    ? maxMenuHeight
    : `${maxMenuHeight}px`;

  return (
    <div className={parentClassNames} {...props}>
      <div className={styles.fieldset} ref={containerRef}>
        {label && <label className={styles.label}>{label}</label>}
        <div
          className={styles.controls}
          onClick={openMenu}
          data-testid="select-controls">
          {Input}
          {Controls}
        </div>
        {transition(({ opacity }) => (
          <animated.div
            className={styles.menu}
            style={{ opacity, maxHeight: menuHeight }}>
            {condition ? (
              <SelectOptions
                options={currentOptions}
                value={value}
                selectOption={selectOption}
                focusedOptionIndex={focusedOptionIndex}
                setFocusedOptionIndex={setFocusedOptionIndex}
                optionRenderer={optionRenderer}
                getOptionLabel={getOptionLabel}
                getOptionValue={getOptionValue}
              />
            ) : (
              Loading
            )}
          </animated.div>
        ))}
      </div>
      <SelectFooter error={error} showError={showError} />
    </div>
  );
};

Select.propTypes = {
  children: PropTypes.func.isRequired,
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
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  searchable: PropTypes.bool,
  inputValue: PropTypes.string,
  onInputChange: PropTypes.func,
  isValid: PropTypes.bool,
  error: PropTypes.string,
  escapeClearsValue: PropTypes.bool,
  noOptionsMessage: PropTypes.string,
  maxMenuHeight: PropTypes.oneOfType(PropTypes.string, PropTypes.number)
};

Select.defaultProps = {
  disabled: false,
  clearable: false,
  options: [],
  label: "",
  separator: false,
  getOptionLabel: defaultLabelKeyGetter,
  getOptionValue: defaultValueKeyGetter,
  optionRenderer: null,
  valueRenderer: null,
  optionsFilter: () => true,
  className: "",
  autoFocus: false,
  searchable: false,
  value: blankValue,
  inputValue: "",
  isValid: true,
  onInputChange: () => {},
  error: "",
  escapeClearsValue: false,
  noOptionsMessage: "",
  maxMenuHeight: ""
};

export default Select;
