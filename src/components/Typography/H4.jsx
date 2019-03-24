import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const H4 = ({ children, className, style }) => (
  <h4 className={`${styles.header4} ${className}`} style={style}>
    {children}
  </h4>
);

H4.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

H4.defaultProps = {
  className: ""
};

export default H4;
