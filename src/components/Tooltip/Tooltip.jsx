import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { classNames } from "../../utils";
import useMediaQuery from "../../hooks/useMediaQuery";
import useClickOutside from "../../hooks/useClickOutside";

const noop = () => ({});

const Tooltip = ({
  children,
  content,
  placement,
  className,
  contentClassName,
  ...props
}) => {
  // Uses 1024px screen width to include big iPad sizes
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [isActive, toggleIsActive] = useState(false);
  const showTooltip = () => toggleIsActive(true);
  const hideTooltip = () => toggleIsActive(false);
  const [tooltipRef] = useClickOutside(hideTooltip);
  return (
    <div
      ref={tooltipRef}
      className={classNames(styles.tooltip, className)}
      onClick={isMobile ? showTooltip : noop}
      {...props}>
      <div
        className={classNames(
          styles.tooltipContent,
          styles[placement],
          contentClassName,
          isActive && styles.showTooltip
        )}>
        {content}
      </div>
      {children}
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node,
  content: PropTypes.node,
  placement: PropTypes.string,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  style: PropTypes.object,
};

Tooltip.defaultProps = {
  placement: "top",
  content: "content",
};

export default Tooltip;
