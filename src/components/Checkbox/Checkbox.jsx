import { PropTypes } from "prop-types";
import React from "react";
import styles from "./styles.css";

const Checkbox = ({ label, className, checked, style, name, id, ...props }) => (
  <label htmlFor={id} className={styles.container}>
    <input
      type="checkbox"
      checked={checked}
      id={id}
      name={name}
      style={style}
      {...props}
    />
    <span className={styles.checkmark} />
    <span>{label}</span>
  </label>
);

Checkbox.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  checked: PropTypes.bool,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default Checkbox;
