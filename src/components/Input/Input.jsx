import PropTypes from "prop-types";
import React from "react";
import { classNames } from "../../utils";
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
	...props,
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
        inputmode={mode}
        ref={textInput}
        {...props}
      >
      </input>
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
      {type === 'number' && 
      	<div className={incrementWrapper}>
		      <button className={incrementButton} onClick={stepUp}>+</button>
		      <button className={decrementButton} onClick={stepDown}>-</button>
	      </div>
    	}
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
