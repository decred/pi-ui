import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const H3 = ({ children, className, style }) => (
  <h3 className={`${styles.header3} ${className}`} style={style}>
    {children}
  </h3>
);

H3.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

H3.defaultProps = {
  className: ""
};

export default H3;
