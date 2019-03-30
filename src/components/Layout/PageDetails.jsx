import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const PageDetails = ({ children, style, className, ...props }) => {
  return (
    <div
      className={`${styles.pageDetails} ${className}`}
      style={style}
      {...props}>
      {children}
    </div>
  );
};

PageDetails.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};

PageDetails.defaultProps = {
  className: ""
};

export default PageDetails;
