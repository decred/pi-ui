import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import { classNames } from "../../utils";
import Description from "../Description/Description.jsx";
import styles from "./styles.css";

export const RadioButton = ({
  name,
  onChange,
  onBlur,
  id,
  checked,
  disabled,
  label,
  className,
  description,
  ...props
}) => {
  const buttonRef = useRef(null);
  const { x } = useSpring({
    x: checked ? 1 : 0,
  });
  return (
    <div
      className={classNames(
        styles.radioButton,
        disabled && styles.disabled,
        className
      )}>
      <input
        name={name}
        id={id}
        type="radio"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        onBlur={onBlur}
        ref={buttonRef}
        {...props}
      />
      <label
        onClick={() => buttonRef.current && buttonRef.current.click()}
        htmlFor={id}>
        <span className={styles.circle} />
        {label}
        <animated.span
          className={styles.dot}
          style={{
            transform: x
              .interpolate({
                range: [0, 0.4, 0.8, 1],
                output: [0, 0.55, 1.2, 1],
              })
              .interpolate((x) => `scale(${x})`),
          }}
        />
      </label>
      <Description body={description} />
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
  disabled,
  optionsListClassName,
  optionsClassName,
}) => (
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
            className={
              optionsClassName && Array.isArray(optionsClassName)
                ? optionsClassName[idx]
                : optionsClassName
            }
            checked={option.value === value}
            label={option.label}
            name={name}
            id={`radio-btn-${idx}`}
            disabled={disabled}
            description={vertical && option.description}
          />
        </li>
      ))}
    </ul>
  </div>
);

RadioButton.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  id: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.node,
  description: PropTypes.node,
  disabled: PropTypes.bool,
  className: PropTypes.string,
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
  disabled: PropTypes.bool,
  optionsClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

RadioButtonGroup.defaultProps = {
  disabled: false,
};
