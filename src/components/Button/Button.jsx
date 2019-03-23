import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const Button = ({ children, className, style, kind }) => (
  <button
    className={`${styles[kind]} ${className}`}
    style={style}
    disabled={kind === "disabled"}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  kind: PropTypes.oneOf(["primary", "secondary", "disabled"])
};

Button.defaultProps = {
  kind: "primary",
  className: ""
};

export default Button;
