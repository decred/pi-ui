import React from "react";
import PropTypes from "prop-types";
import { SelectControls, defaultLabelKeyGetter } from "../helpers";
import { useMultiSelect } from "./hooks";
import { classNames } from "../../../utils";
import multiStyles from "./styles.css";
import SelectWrapper from "../SelectWrapper.jsx";

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

const MultiSelect = ({ value, ...props }) => (
  <SelectWrapper {...{ ...props, value }}>
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
      onSearch,
      _options,
      setOptions,
      focusedOptionIndex,
      setFocusedOptionIndex,
      selectOption,
      resetMenu,
      removeSelectedOptionFilter
    }) => {
      const { cancelSelection, removeSelectedOption } = useMultiSelect(
        disabled,
        onChange,
        options,
        getOptionLabel,
        getOptionValue,
        optionsFilter,
        searchable,
        value,
        inputValue,
        onInputChange,
        _options,
        setOptions,

        focusedOptionIndex,
        setFocusedOptionIndex,
        menuOpened,
        selectOption,
        resetMenu,
        removeSelectedOptionFilter
      );

      const Input =
        searchable && inputValue ? (
          <input
            disabled={disabled}
            className={classNames(
              multiStyles.input,
              disabled && multiStyles.disabled
            )}
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
        );

      const Controls = (
        <SelectControls
          clearable={clearable}
          cancelSelection={cancelSelection}
          valueSelected={value.length}
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

MultiSelect.propTypes = {
  value: PropTypes.array
};

MultiSelect.defaultProps = {
  value: []
};

export default MultiSelect;
