import React from "react";
import { SelectInput, SelectControls } from "../helpers";
import { useBasicSelect } from "./hooks";
import Select from "../Select.jsx";

const BasicSelect = (props) => (
  <Select {...props}>
    {({
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
      menuOpened,
      cancelSelection,
      onSearch,
      setCurrentOptions,
      selectOption,
      onTypeArrowDownHandler,
      onTypeArrowUpHandler,
      onTypeDefaultHandler,
      isValid
    }) => {
      useBasicSelect(
        disabled,
        onChange,
        options,
        getOptionLabel,
        optionsFilter,
        value,
        searchable,
        inputValue,
        setCurrentOptions,
        selectOption,
        onTypeArrowDownHandler,
        onTypeArrowUpHandler,
        onTypeDefaultHandler
      );

      const Input = (
        <SelectInput
          searchable={searchable}
          inputValue={inputValue}
          disabled={disabled}
          onSearch={onSearch}
          getOptionLabel={getOptionLabel}
          valueRenderer={valueRenderer}
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
          error={!isValid}
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

export default BasicSelect;
