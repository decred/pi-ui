import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const H2 = ({ children, className, style }) => (
  <h2 className={`${styles.header2} ${className}`} style={style}>
    {children}
  </h2>
);

H2.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

H2.defaultProps = {
  className: ""
};

export default H2;
