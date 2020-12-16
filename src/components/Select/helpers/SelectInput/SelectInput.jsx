import React from "react";
import PropTypes from "prop-types";
import { blankValue } from "../../helpers";
import { classNames } from "../../../../utils";
import styles from "./styles.css";

const SelectInput = ({
  searchable,
  inputValue,
  disabled,
  onSearch,
  getOptionLabel,
  value
}) =>
  searchable && inputValue ? (
    <input
      disabled={disabled}
      className={classNames(styles.input, disabled && styles.disabled)}
      value={inputValue}
      onChange={onSearch}
      autoFocus
    />
  ) : (
    <div className={classNames(styles.value, disabled && styles.disabled)}>
      {value !== blankValue && getOptionLabel(value)}
    </div>
  );

SelectInput.propTypes = {
  searchable: PropTypes.bool,
  inputValue: PropTypes.string,
  disabled: PropTypes.bool,
  onSearch: PropTypes.func,
  getOptionLabel: PropTypes.func.isRequired,
  value: PropTypes.object
};

SelectInput.defaultProps = {
  searchable: false,
  inputValue: "",
  disabled: false,
  onSearch: null,
  value: null
};

export default SelectInput;
