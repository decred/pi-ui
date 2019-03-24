import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const H1 = ({ children, className, style }) => (
  <h1 className={`${styles.header1} ${className}`} style={style}>
    {children}
  </h1>
);

H1.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

H1.defaultProps = {
  className: ""
};

export default H1;
