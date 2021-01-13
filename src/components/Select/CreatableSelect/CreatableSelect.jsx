import React from "react";
import PropTypes from "prop-types";
import {
  SelectInput,
  SelectControls,
  defaultPromptTextCreator
} from "../helpers";
import { useCreatableSelect } from "./hooks";
import Select from "../Select.jsx";

const CreatableSelect = ({
  typeLabel,
  isValidNewOption,
  newOptionCreator,
  promptTextCreator,
  ...props
}) => (
  <Select {...props}>
    {({
      disabled,
      clearable,
      options,
      separator,
      getOptionLabel,
      getOptionValue,
      optionsFilter,
      searchable,
      value,
      onChange,
      inputValue,
      onInputChange,
      setOption,
      menuOpened,
      cancelSelection,
      setCurrentOptions,
      selectOption,
      setMenuOpened,
      onTypeArrowDownHandler,
      onTypeArrowUpHandler,
      setInvalidNewOption,
      invalidNewOption,
      isValid
    }) => {
      const { onSearch } = useCreatableSelect(
        disabled,
        onChange,
        options,
        getOptionLabel,
        optionsFilter,
        searchable,
        value,
        inputValue,
        onInputChange,
        menuOpened,
        selectOption,
        setMenuOpened,
        typeLabel,
        isValidNewOption,
        newOptionCreator,
        promptTextCreator,
        setCurrentOptions,
        setOption,
        onTypeArrowDownHandler,
        onTypeArrowUpHandler,
        setInvalidNewOption
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
          error={invalidNewOption || !isValid}
        />
      );

      return {
        Loading: null,
        Input,
        Controls,
        condition: true
      };
    }}
  </Select>
);

CreatableSelect.propTypes = {
  typeLabel: PropTypes.string,
  isValidNewOption: PropTypes.func,
  newOptionCreator: PropTypes.func,
  promptTextCreator: PropTypes.func
};

CreatableSelect.defaultProps = {
  typeLabel: "Type to add a new option",
  isValidNewOption: null,
  newOptionCreator: null,
  promptTextCreator: defaultPromptTextCreator
};

export default CreatableSelect;
