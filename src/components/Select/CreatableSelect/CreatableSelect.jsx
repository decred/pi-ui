import React from "react";
import PropTypes from "prop-types";
import {
  SelectInput,
  SelectControls,
  defaultPromptTextCreator
} from "../helpers";
import { useCreatableSelect } from "./hooks";
import { classNames } from "../../../utils";
import creatableStyles from "./styles.css";
import SelectWrapper from "../SelectWrapper.jsx";

const CreatableSelect = ({
  typeLabel,
  error,
  isValidNewOption,
  newOptionCreator,
  promptTextCreator,
  ...props
}) => (
  <SelectWrapper {...props}>
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
      className,
      onTypeArrowDownHandler,
      onTypeArrowUpHandler,
      setShowError,
      showError
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
        setShowError
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

      return {
        Loading: null,
        Footer,
        Input,
        Controls,
        condition: true
      };
    }}
  </SelectWrapper>
);

CreatableSelect.propTypes = {
  typeLabel: PropTypes.string,
  error: PropTypes.string,
  isValidNewOption: PropTypes.func,
  newOptionCreator: PropTypes.func,
  promptTextCreator: PropTypes.func
};

CreatableSelect.defaultProps = {
  typeLabel: "Type to add a new option",
  error: "",
  isValidNewOption: null,
  newOptionCreator: null,
  promptTextCreator: defaultPromptTextCreator
};

export default CreatableSelect;
