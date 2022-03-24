import React from "react";
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

export default NumberInput;
