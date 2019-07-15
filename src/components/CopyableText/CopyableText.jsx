import PropTypes from "prop-types";
import React from "react";
import Text from "../Typography/Text/Text.jsx";
import CopyToClipboard from "./assets/CopyToClipboard.svg";
import { copyToClipboard as copy } from "./helpers";
import { classNames, idPropTypeCheckForTruncatedComponents } from "../../utils";
import styles from "./styles.css";

const CopyableText = ({ id, truncate, children, className, ...props }) => {
  return (
    <div className={classNames(styles.copyableWrapper, className)} {...props}>
      <Text id={id} className={styles.addressWrapper}>
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
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  id: idPropTypeCheckForTruncatedComponents
};

CopyableText.defaultProps = {
  truncate: false
};

export default CopyableText;
