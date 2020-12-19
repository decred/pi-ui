import React from "react";
import PropTypes from "prop-types";
import { blankValue } from "../../helpers";
import { classNames } from "../../../../utils";
import styles from "./styles.css";

const SelectOptions = ({
  options,
  value,
  selectOption,
  focusedOptionIndex,
  setFocusedOptionIndex,
  optionRenderer,
  getOptionLabel,
  getOptionValue
}) => {
  const isEqual = (_value, option) =>
    getOptionValue(_value) === getOptionValue(option);

  const isSelectedValue = (_value, option) =>
    Array.isArray(_value)
      ? _value.find((__value) => isEqual(__value, option))
      : isEqual(_value, option);

  return options.map((option, index) => (
    <div
      onClick={selectOption}
      onMouseEnter={() => setFocusedOptionIndex(index)}
      key={index}
      index={index}
      className={classNames(
        styles.option,
        index === focusedOptionIndex && styles.focusedOption,
        isSelectedValue(value, option) && styles.selectedOption
      )}>
      {option !== blankValue &&
        (optionRenderer ? optionRenderer(option) : getOptionLabel(option))}
    </div>
  ));
};

SelectOptions.propTypes = {
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selectOption: PropTypes.func.isRequired,
  focusedOptionIndex: PropTypes.number,
  setFocusedOptionIndex: PropTypes.func.isRequired,
  optionRenderer: PropTypes.func,
  getOptionLabel: PropTypes.func.isRequired,
  getOptionValue: PropTypes.func.isRequired
};

SelectOptions.defaultProps = {
  options: [],
  value: null,
  focusedOptionIndex: 0,
  optionRenderer: null
};

export default SelectOptions;
