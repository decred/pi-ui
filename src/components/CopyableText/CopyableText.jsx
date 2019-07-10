import PropTypes from "prop-types";
import React from "react";
import Text from "../Typography/Text/Text.jsx";
import CopyToClipboard from "./assets/CopyToClipboard.svg";
import { copyToClipboard as copy } from "./helpers";
import styles from "./styles.css";

const CopyableText = ({ truncate, children }) => {
  return (
    <div>
      <Text className={styles.addressWrapper} truncate={truncate}>
        {children}
      </Text>
      <img
        className={styles.copyToClipboard}
        onClick={() => copy(children)}
        src={CopyToClipboard}
        alt="copy to clipboard"
      />
    </div>
  );
};

CopyableText.propTypes = {
  truncate: PropTypes.bool,
  children: PropTypes.string.isRequired
};

CopyableText.defaultProps = {
  truncate: false
};

export default CopyableText;
