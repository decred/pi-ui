import PropTypes from "prop-types";
import React from "react";
import { classNames } from "../../utils";
import Icon from "../Icon/Icon.jsx";

const Input = ({ type, label, id, error, mode, wrapperStyle, inputStyle, labelStyle, iconStyle, errorStyle, ...props }) => {
  return (
    <div className={wrapperStyle}>
      <input
        id={id}
        placeholder=" "
        className={inputStyle}
        type={type}
        inputmode={mode}
        {...props}
      />
      {label &&
	      <label htmlFor={id} className={labelStyle}>
	        {label}
	      </label>
    	}
      <Icon
        type="alert"
        backgroundColor="#ed6d47"
        iconColor="#feb8a5"
        className={iconStyle}
      />
      <p
        className={errorStyle}>
        {error}
      </p>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  error: PropTypes.string
};

export default Input;
