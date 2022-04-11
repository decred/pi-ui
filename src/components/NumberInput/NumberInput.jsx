import React from "react";
import PropTypes from "prop-types";
import TextInput from "../TextInput/TextInput.jsx";
import styles from "./styles.module.css";

const NumberInput = ({ ...props }) => {
  return (
    <TextInput
      wrapperClassNames={styles.numberInputWrapper}
      inputClassNames={styles.numberInput}
      label=""
      type="number"
      {...props}
    />
  );
};

NumberInput.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  style: PropTypes.object,
};

export default NumberInput;
