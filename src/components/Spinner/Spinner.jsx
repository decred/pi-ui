import React from "react";
import styles from "./styles.module.css";
import PropTypes from "prop-types";

const Spinner = ({ invert, width, height }) => {
  return (
    <div
      className={invert ? styles.spinnerInvert : styles.spinner}
      style={{ width, height }}
    />
  );
};

Spinner.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  invert: PropTypes.bool,
};

export default Spinner;
