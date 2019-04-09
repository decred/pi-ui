import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const Button = ({ children, className, style, kind, onClick, ...props }) => (
  <button
    className={classNames(styles[kind], className)}
    style={style}
    disabled={kind === "disabled"}
    onClick={onClick}
    {...props}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  kind: PropTypes.oneOf(["primary", "secondary", "disabled"])
};

Button.defaultProps = {
  kind: "primary"
};

export default Button;
