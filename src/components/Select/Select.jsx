import React from "react";
import { classNames } from "../../utils";
import styles from "./styles.css";
import {
  SelectOptions,
  blankValue,
  defaultLabelKeyGetter,
  defaultValueKeyGetter
} from "./helpers";
import { animated } from "react-spring";
import PropTypes from "prop-types";
import { useSelect } from "./hooks";

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
  ...props
}) => {
  const {
    containerRef,
    menuOpened,
    openMenu,
    transitions,
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
    showError,
    setShowError
  } = useSelect(
    value,
    disabled,
    options,
    getOptionLabel,
    getOptionValue,
    autoFocus,
    onChange,
    inputValue,
    onInputChange,
    searchable
  );

  const { Loading, Footer, Input, Controls, condition, errorClassName } = children({
    containerRef,
    menuOpened,
    openMenu,
    transitions,
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
    showError,
    setShowError
  });

  const valueSelectedCondition = Array.isArray(value)
    ? value.length
    : getOptionValue(value);

  const parentClassNames = classNames(
    styles.select,
    valueSelectedCondition && styles.valueSelected,
    searchable && inputValue && styles.search,
    menuOpened ? styles.menuOpened : styles.menuClosed,
    separator && styles.hasSeparator,
    clearable && styles.clearable,
    disabled && styles.disabled,
    errorClassName,
    className
  );

  return (
    <div className={parentClassNames} {...props}>
      <div className={styles.fieldset} ref={containerRef}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.controls} onClick={openMenu}>
          {Input}
          {Controls}
        </div>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div className={styles.menu} key={key} style={props}>
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
            )
        )}
      </div>
      {Footer}
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
  onInputChange: PropTypes.func
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
  onInputChange: null
};

export default Select;
