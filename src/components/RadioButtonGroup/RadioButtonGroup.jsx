import React from "react";
import PropTypes from "prop-types";
import { classNames } from "../../utils";
import styles from "./styles.css";

export const RadioButton = ({
  name,
  onChange,
  onBlur,
  id,
  checked,
  label,
  className,
  ...props
}) => {
  return (
    <div className={classNames(styles.radioButton, className)}>
      <input
        name={name}
        id={id}
        type="radio"
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames(styles.radioButton, className)}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export const RadioButtonGroup = ({
  options,
  value,
  onChange,
  label,
  name,
  className,
  vertical,
  optionsListClassName,
  optionClassName
}) => {
  return (
    <div className={classNames(styles.radioGroup, className)}>
      <label className={styles.radioGroupLabel}>{label}</label>
      <ul
        className={classNames(
          styles.radioGroupList,
          vertical && styles.vertical,
          optionsListClassName
        )}>
        {options.map((option) => (
          <li>
            {" "}
            <RadioButton
              onChange={() => onChange(option)}
              className={optionClassName}
              checked={option.value === value}
              label={option.label}
              name={name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

RadioButton.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  id: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string
};

RadioButtonGroup.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  vertical: PropTypes.bool,
  optionsListClassName: PropTypes.string,
  optionClassName: PropTypes.string
};
