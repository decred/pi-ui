import React from "react";
import { SelectInput, SelectControls } from "../helpers";
import { useBasicSelect } from "./hooks";
import SelectWrapper from "../SelectWrapper.jsx";

const BasicSelect = (props) => (
  <SelectWrapper {...props}>
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
      onInputChange,

      menuOpened,
      cancelSelection,
      onSearch,
      _options,
      setOptions,
      focusedOptionIndex,
      setFocusedOptionIndex,
      selectOption
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
        onInputChange,
        _options,
        setOptions,
        menuOpened,
        focusedOptionIndex,
        setFocusedOptionIndex,
        selectOption
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
        />
      );

      return {
        Loading: null,
        Footer: null,
        Input,
        Controls,
        condition: true
      };
    }}
  </SelectWrapper>
);

export default BasicSelect;
