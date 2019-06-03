import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const Tooltip = ({ children, content, placement }) => {
  return (
    <div className={styles.tooltip}>
      <div className={classNames(styles.tooltipContent, styles[placement])}>
        {content}
      </div>
      {children}
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.string,
  content: PropTypes.string
};

Tooltip.defaultProps = {
  placement: "top",
  content: "content"
};

export default Tooltip;
