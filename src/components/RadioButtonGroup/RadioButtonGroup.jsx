import React, { useRef } from "react";
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
  const buttonRef = useRef(null);
  return (
    <div className={classNames(styles.radioButton, className)}>
      <input
        name={name}
        id={id}
        type="radio"
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        ref={buttonRef}
        className={classNames(styles.radioButton)}
        {...props}
      />
      <label
        onClick={() => buttonRef.current && buttonRef.current.click()}
        htmlFor={id}>
        {label}
      </label>
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
        {options.map((option, idx) => (
          <li key={`radio-btn-${idx}`}>
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
