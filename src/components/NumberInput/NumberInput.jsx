import PropTypes from "prop-types";
import React from "react";
import { classNames } from "../../utils";
import styles from "./styles.css";
import Input from "../Input/Input.jsx";

const NumberInput = ({ label, min, id, error, ...props }) => {
  return (
    <Input
      type="number"
      id={id}
      error={error}
      min={min}
      mode="numeric"
      incrementWrapper={styles.incrementWrapperStyle}
      decrementButton={styles.decrementButtonStyle}
      incrementButton={styles.incrementButtonStyle}
      wrapperStyle={styles.numberinputWrapper}
      inputStyle={classNames(
        styles.numberinput,
        error && styles.numberinputError
      )}
      iconStyle={classNames(styles.errorIcon, error && styles.errorIconActive)}
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
  label: PropTypes.string
};

NumberInput.defaultProps = {
  min: 0
};

export default NumberInput;
