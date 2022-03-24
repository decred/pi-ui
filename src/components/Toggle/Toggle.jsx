import React from "react";
import PropTypes from "prop-types";
import { classNames } from "../../utils";

import styles from "./styles.module.css";

const Toggle = ({ onToggle, toggled, disabled, className }) => {
  return (
    <div className={classNames(styles.toggle, className)}>
      <div
        data-testid="switch"
        disabled={disabled}
        className={toggled ? styles.toggled : styles.notToggled}
        onClick={!disabled ? onToggle : undefined}>
        <div className={styles.knob}></div>
      </div>
    </div>
  );
};

Toggle.propTypes = {
  onToggle: PropTypes.func,
  toggled: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Toggle;
