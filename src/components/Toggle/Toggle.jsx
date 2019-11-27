import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.css";

const Toggle = ({ onToggle, label }) => {
  return (
    <div className={styles.toggle}>
      <div className={styles.switch}>
        <div className={styles.circle}>&nbsp;</div>
        <div className={styles.bar} onClick={onToggle}>
          &nbsp;
        </div>
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

Toggle.propTypes = {
  onToggle: PropTypes.func,
  label: PropTypes.string.isRequired
};

export default Toggle;
