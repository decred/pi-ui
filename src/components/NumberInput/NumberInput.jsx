import PropTypes from "prop-types";
import React from "react";
import { classNames } from "../../utils";
import styles from "./styles.css";
import Input from '../Input/Input.jsx';

const NumberInput = ({ type, label, min, mode, id, error, ...props }) => {
  return (
    <Input 
    	type={type}
    	id={id}
    	error={error}
    	min={min}
    	mode={mode}
    	wrapperStyle={styles.numberinputWrapper}
    	inputStyle={classNames(styles.numberinput, error && styles.numberinputError)}
    	iconStyle={classNames(
        styles.errorIcon,
        error && styles.errorIconActive
      )}
    	labelStyle={styles.numberinputLabel}
    	errorStyle={classNames(styles.errorMsg, error && styles.errorMsgActive)}
    />
  );
};

NumberInput.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
  min: PropTypes.number,
  mode: PropTypes.string,
};

NumberInput.defaultProps = {
  type: "number",
  min: 0,
  mode: 'numeric',
};

export default NumberInput;
