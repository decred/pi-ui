import PropTypes from "prop-types";
import React from "react";
import Icon from "../Icon/Icon.jsx";

const Input = ({
  type,
  label,
  placeholder,
  id,
  error,
  mode,
  wrapperStyle,
  inputStyle,
  labelStyle,
  iconStyle,
  errorStyle,
  incrementWrapper,
  incrementButton,
  decrementButton,
  ...props
}) => {
  let textInput = React.createRef();

  function stepUp() {
    textInput.current.stepUp();
  }

  function stepDown() {
    textInput.current.stepDown();
  }
  return (
    <div className={wrapperStyle}>
      <input
        id={id}
        placeholder={placeholder}
        className={inputStyle}
        type={type}
        inputMode={mode}
        ref={textInput}
        {...props}
      />
      {label && (
        <label htmlFor={id} className={labelStyle}>
          {label}
        </label>
      )}
      <Icon
        type="alert"
        backgroundColor="#ed6d47"
        iconColor="#feb8a5"
        className={iconStyle}
      />
      {type === "number" && (
        <div className={incrementWrapper}>
          <div className={incrementButton} onClick={stepUp} />
          <div className={decrementButton} onClick={stepDown} />
        </div>
      )}
      <p className={errorStyle}>{error}</p>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  mode: PropTypes.string.isRequired,
  wrapperStyle: PropTypes.string.isRequired,
  inputStyle: PropTypes.string.isRequired,
  labelStyle: PropTypes.string.isRequired,
  iconStyle: PropTypes.string.isRequired,
  errorStyle: PropTypes.string.isRequired,
  incrementWrapper: PropTypes.string,
  incrementButton: PropTypes.string,
  decrementButton: PropTypes.string
};

export default Input;
