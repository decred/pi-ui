import PropTypes from "prop-types";
import React, { useState } from "react";
import Text from "../Typography/Text/Text.jsx";
import { copyToClipboard as copy } from "./helpers";
import { classNames, idPropTypeCheckForTruncatedComponents } from "../../utils";
import styles from "./styles.css";
import Tooltip from "../Tooltip/Tooltip.jsx";
import Icon from "../Icon/Icon.jsx";

const CopyableText = ({
  id,
  truncate,
  children,
  className,
  hoverText,
  tooltipPlacement,
  ...props
}) => {
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
        content={feedbackActive ? "Copied!" : hoverText}>
          <Icon type="copyToClipboard" backgroundColor="#2970ff" iconColor="#f7f8f9" className={styles.copyToClipboard}/>
      </Tooltip>
    </div>
  );
};

CopyableText.propTypes = {
  truncate: PropTypes.bool,
  children: PropTypes.string,
  hoverText: PropTypes.string,
  className: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  id: idPropTypeCheckForTruncatedComponents
};

CopyableText.defaultProps = {
  truncate: false,
  hoverText: "Copy to clipboard",
  tooltipPlacement: "right"
};

export default CopyableText;
