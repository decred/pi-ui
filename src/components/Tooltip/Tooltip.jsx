import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const Tooltip = ({
  children,
  content,
  placement,
  className,
  contentClassName,
  ...props
}) => {
  return (
    <div className={classNames(styles.tooltip, className)} {...props}>
      <div
        className={classNames(
          styles.tooltipContent,
          styles[placement],
          contentClassName
        )}>
        {content}
      </div>
      {children}
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.string,
  content: PropTypes.string,
  className: PropTypes.string,
  contentClassName: PropTypes.string
};

Tooltip.defaultProps = {
  placement: "top",
  content: "content"
};

export default Tooltip;
