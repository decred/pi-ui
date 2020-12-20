import React from "react";
import PropTypes from "prop-types";
import { SelectControls, defaultLabelKeyGetter } from "../helpers";
import { useMultiSelect } from "./hooks";
import { classNames } from "../../../utils";
import multiStyles from "./styles.css";
import Select from "../Select.jsx";

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
  <Select {...{ ...props, value }}>
    {({
      disabled,
      clearable,
      options,
      separator,
      getOptionLabel,
      valueRenderer,
      optionsFilter,
      searchable,
      value,
      onChange,
      inputValue,
      menuOpened,
      onSearch,
      setCurrentOptions,
      selectOption,
      resetMenu,
      removeSelectedOptionFilter,
      onTypeArrowDownHandler,
      onTypeArrowUpHandler,
      onTypeDefaultHandler
    }) => {
      const { cancelSelection, removeSelectedOption } = useMultiSelect(
        disabled,
        onChange,
        options,
        getOptionLabel,
        optionsFilter,
        searchable,
        value,
        inputValue,
        setCurrentOptions,
        selectOption,
        resetMenu,
        removeSelectedOptionFilter,
        onTypeArrowDownHandler,
        onTypeArrowUpHandler,
        onTypeDefaultHandler
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
  </Select>
);

MultiSelect.propTypes = {
  value: PropTypes.array
};

MultiSelect.defaultProps = {
  value: []
};

export default MultiSelect;
