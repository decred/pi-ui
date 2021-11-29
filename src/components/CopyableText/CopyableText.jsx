import PropTypes from "prop-types";
import React, { useState } from "react";
import { copyToClipboard as copy } from "./helpers";
import { classNames, idPropTypeCheckForTruncatedComponents } from "../../utils";
import styles from "./styles.css";
import Tooltip from "../Tooltip/Tooltip.jsx";
import Icon from "../Icon/Icon.jsx";
import TextHighlighted from "../TextHighlighted/TextHighlighted.jsx";

const CopyableText = ({
  id,
  truncate,
  children,
  className,
  hoverText,
  textClassName,
  textStyle,
  buttonClassName,
  buttonStyle,
  tooltipPlacement,
  ...props
}) => {
  const [feedbackActive, setFeedbackActive] = useState(false);
  const onCopyToClipboard = (value) => {
    copy(value);
    setFeedbackActive(true);
    setTimeout(() => {
      setFeedbackActive(false);
    }, 1000);
  };
  return (
    <div className={classNames(styles.copyableWrapper, className)} {...props}>
      <TextHighlighted
        id={id}
        truncate={truncate}
        className={textClassName}
        style={textStyle}>
        {children}
      </TextHighlighted>
      <Tooltip
        placement={tooltipPlacement}
        content={feedbackActive ? "Copied!" : hoverText}>
        <Icon
          type="copyToClipboard"
          backgroundColor="var(--color-primary)"
          iconColor="var(--color-gray-lightest2)"
          onClick={() => onCopyToClipboard(children)}
          className={classNames(styles.copyToClipboard, buttonClassName)}
          style={buttonStyle}
        />
      </Tooltip>
    </div>
  );
};

CopyableText.propTypes = {
  truncate: PropTypes.bool,
  children: PropTypes.node,
  hoverText: PropTypes.node,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  textStyle: PropTypes.object,
  buttonClassName: PropTypes.string,
  buttonStyle: PropTypes.object,
  tooltipPlacement: PropTypes.string,
  id: idPropTypeCheckForTruncatedComponents,
};

CopyableText.defaultProps = {
  truncate: true,
  hoverText: "Copy to clipboard",
  tooltipPlacement: "right",
};

export default CopyableText;
