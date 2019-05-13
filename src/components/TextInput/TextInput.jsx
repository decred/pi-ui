import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

// TODO: Replace warning icon
const TextInput = ({ type, label, id, error, ...props }) => {
  return (
    <div className={styles.textinputWrapper}>
      <input
        id={id}
        placeholder=" "
        className={classNames(styles.textinput, error && styles.textinputError)}
        type={type}
        {...props}
      />
      <label htmlFor={id} className={styles.textinputLabel}>
        {label}
      </label>
      {error && (
        <>
          <i className={styles.errorIcon}>&#9888;</i>
          <p className={styles.errorMsg}>{error}</p>
        </>
      )}
    </div>
  );
};

TextInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string
};

TextInput.defaultProps = {
  type: "text",
  label: "Label"
};

export default TextInput;
