import React from "react";
import PropTypes from "prop-types";
import {
  SelectInput,
  SelectControls,
  blankValue,
  defaultLabelKeyGetter,
  defaultValueKeyGetter
} from "../helpers";
import { useAsyncSelect } from "./hooks";
import asyncStyles from "./styles.css";
import selectWrapper from "../SelectWrapper.jsx";

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

  const Input = (
    <SelectInput
      searchable={true}
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

  const Loading = (
    <div className={asyncStyles.loadingMessage}>{loadingMessage}</div>
  );

  const condition = !loading;

  return selectWrapper(
    Loading,
    null,
    Input,
    Controls,
    condition,
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
      searchable: true,
      value,
      inputValue,

      getOptionLabel,
      optionRenderer,
      selectOption,

      ...props
    }
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
