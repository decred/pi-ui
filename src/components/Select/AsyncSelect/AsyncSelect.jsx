import React from "react";
import PropTypes from "prop-types";
import { SelectInput, SelectControls } from "../helpers";
import { useAsyncSelect } from "./hooks";
import asyncStyles from "./styles.css";
import SelectWrapper from "../SelectWrapper.jsx";

const AsyncSelect = ({
  defaultOptions,
  cacheOptions,
  loadOptions,
  loadingMessage,
  ...props
}) => (
  <SelectWrapper {...{ searchable: true, ...props }}>
    {({
      disabled,
      clearable,
      options,
      separator,
      getOptionLabel,
      getOptionValue,
      valueRenderer,
      value,
      inputValue,
      menuOpened,
      cancelSelection,
      setCurrentOptions,
      selectOption,
      onTypeArrowDownHandler,
      onTypeArrowUpHandler,
      onTypeDefaultHandler,
      onSearch
    }) => {
      const { loading } = useAsyncSelect(
        options,
        getOptionLabel,
        inputValue,
        defaultOptions,
        cacheOptions,
        loadOptions,
        setCurrentOptions,
        selectOption,
        onTypeArrowDownHandler,
        onTypeArrowUpHandler,
        onTypeDefaultHandler
      );

      const Input = (
        <SelectInput
          searchable={true}
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

      const Loading = (
        <div className={asyncStyles.loadingMessage}>{loadingMessage}</div>
      );

      const condition = !loading;

      return {
        Loading,
        Footer: null,
        Input,
        Controls,
        condition
      };
    }}
  </SelectWrapper>
);

AsyncSelect.propTypes = {
  defaultOptions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  cacheOptions: PropTypes.bool,
  loadOptions: PropTypes.func,
  loadingMessage: PropTypes.string
};

AsyncSelect.defaultProps = {
  defaultOptions: false,
  cacheOptions: false,
  loadOptions: null,
  loadingMessage: "Loading..."
};

export default AsyncSelect;
