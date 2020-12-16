import React from "react";
import PropTypes from "prop-types";
import {
  SelectInput,
  SelectControls,
  blankValue,
  defaultLabelKeyGetter,
  defaultValueKeyGetter
} from "../helpers";
import { useBasicSelect } from "./hooks";
import SelectWrapper from "../SelectWrapper";

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
    onSearch,
    transitions
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

  const Input = (
    <SelectInput
      searchable={searchable}
      inputValue={inputValue}
      disabled={disabled}
      onSearch={onSearch}
      getOptionLabel={getOptionLabel}
      value={value}
    />
  );

  const Controls = (
    <SelectControls
      clearable={clearable}
      cancelSelection={cancelSelection}
      valueSelected={getOptionValue(value)}
      disabled={disabled}
      separator={separator}
      menuOpened={menuOpened}
    />
  );

  return SelectWrapper(
    null,
    null,
    Input,
    Controls,
    true,
    {
      containerRef,
      menuOpened,
      openMenu,
      transitions,

      focusedOptionIndex,
      setFocusedOptionIndex,
      _options
    },
    {
      disabled,
      clearable,
      options,
      label,
      separator,
      getOptionValue,
      className,
      searchable,
      value,
      inputValue,

      getOptionLabel,
      optionRenderer,
      selectOption,

      ...props
    }
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
