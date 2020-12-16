import React from "react";
import PropTypes from "prop-types";
import {
  SelectInput,
  SelectControls,
  blankValue,
  defaultLabelKeyGetter,
  defaultValueKeyGetter,
  defaultPromptTextCreator
} from "../helpers";
import { useCreatableSelect } from "./hooks";
import { classNames } from "../../../utils";
import creatableStyles from "./styles.css";
import SelectWrapper from "../SelectWrapper";

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
      error={error}
      showError={showError}
    />
  );

  const Footer = error && showError && (
    <p
      className={classNames(
        creatableStyles.errorMsg,
        creatableStyles.errorMsgActive
      )}>
      {error}
    </p>
  );

  className = classNames(className, showError && creatableStyles.error);

  return SelectWrapper(
    null,
    Footer,
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
