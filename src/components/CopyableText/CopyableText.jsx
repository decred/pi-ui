import PropTypes from "prop-types";
import React, { useState } from "react";
import Text from "../Typography/Text/Text.jsx";
import CopyToClipboard from "./assets/CopyToClipboard.svg";
import { copyToClipboard as copy } from "./helpers";
import { classNames, idPropTypeCheckForTruncatedComponents } from "../../utils";
import styles from "./styles.css";
import Tooltip from '../Tooltip/Tooltip.jsx';

const CopyableText = ({ id, truncate, children, className, hoverText, tooltipPlacement, ...props }) => {
	const [feedbackActive, setFeedbackActive] = useState(false);
  const onCopyToClipboard = (value) => {
    copy(value);
    setFeedbackActive(true);
    setTimeout(() => {
      setFeedbackActive(false);
    }, 800);
  };
  return (
  	 <div className={classNames(styles.copyableWrapper, className)} {...props}>
      <Text id={id} className={styles.addressWrapper}>
        {children}
      </Text>
      <Tooltip
	      placement={tooltipPlacement}
	      content={feedbackActive ? "Copied!" : hoverText}
      >
      <img
        className={styles.copyToClipboard}
        onClick={() => onCopyToClipboard(children)}
        src={CopyToClipboard}
        alt="copy to clipboard"
      />
    </Tooltip>
    </div>
  );
};

CopyableText.propTypes = {
  truncate: PropTypes.bool,
  children: PropTypes.string.isRequired,
  hoverText: PropTypes.string,
  className: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  id: idPropTypeCheckForTruncatedComponents
};

CopyableText.defaultProps = {
  truncate: false,
  hoverText: 'Copy to clipboard',
  tooltipPlacement: "right"
};

export default CopyableText;
