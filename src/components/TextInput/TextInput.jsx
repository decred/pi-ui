import PropTypes from "prop-types";
import React from "react";
import { classNames } from "../../utils";
import styles from "./styles.css";
import Input from "../Input/Input.jsx";

const TextInput = ({ type, label, placeholder, id, mode, error, ...props }) => {
  return (
    <Input
      type={type}
      label={label}
      id={id}
      mode={mode}
      placeholder={placeholder}
      error={error}
      wrapperStyle={classNames(styles.textinputWrapper)}
      inputStyle={classNames(styles.textinput, error && styles.textinputError)}
      iconStyle={classNames(styles.errorIcon, error && styles.errorIconActive)}
      labelStyle={classNames(styles.textinputLabel)}
      errorStyle={classNames(styles.errorMsg, error && styles.errorMsgActive)}
    />
  );
};

TextInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
  mode: PropTypes.string,
  placeholder: PropTypes.string,
};

TextInput.defaultProps = {
  type: "text",
  mode: "text",
  label: "Label",
  placeholder: " "
};

export default TextInput;
