import PropTypes from "prop-types";
import React from "react";
import { classNames } from "../../utils";
import styles from "./styles.css";
import Input from '../Input/Input.jsx';

const TextInput = ({ type, label, id, error, ...props }) => {
  return (
    <Input 
    	type={type}
    	label={label}
    	id={id}
    	error={error}
    	wrapperStyle={styles.textinputWrapper}
    	inputStyle={classNames(styles.textinput, error && styles.textinputError)}
    	iconStyle={classNames(
        styles.errorIcon,
        error && styles.errorIconActive
      )}
    	labelStyle={styles.textinputLabel}
    	errorStyle={classNames(styles.errorMsg, error && styles.errorMsgActive)}
    />
  );
};

TextInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  error: PropTypes.string
};

TextInput.defaultProps = {
  type: "text",
  label: "Label"
};

export default TextInput;
