import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const P = ({ children, className, style }) => (
  <p className={`${styles.paragraph} ${className}`} style={style}>
    {children}
  </p>
);

P.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

P.defaultProps = {
  className: ""
};

export default P;
