import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const TextInput = ({ type, label, id, ...props }) => {
  return (
    <div className={styles.textinputWrapper}>
      <input
        id={id}
        placeholder=" "
        className={styles.textinput}
        type={type}
        {...props}
      />
      <label htmlFor={id} className={styles.textinputLabel}>
        {label}
      </label>
    </div>
  );
};

TextInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string
};

TextInput.defaultProps = {
  type: "text",
  label: "Label"
};

export default TextInput;
