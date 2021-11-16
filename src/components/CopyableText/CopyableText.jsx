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
      <Text id={id} truncate={truncate} className={classNames(styles.contentWrapper, textClassName)} style={textStyle}>
        {children}
      </Text>
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
  children: PropTypes.string,
  hoverText: PropTypes.string,
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
