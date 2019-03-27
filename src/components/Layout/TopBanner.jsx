import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const TopBanner = ({ children, style, className, ...props }) => {
  return (
    <div
      className={`${styles.topBanner} ${className}`}
      style={style}
      {...props}>
      {children}
    </div>
  );
};

TopBanner.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};

TopBanner.defaultProps = {
  className: ""
};

export default TopBanner;
