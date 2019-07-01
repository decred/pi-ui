import PropTypes from "prop-types";
import React from "react";
import { classNames } from "../../utils";
import Spinner from "../Spinner/Spinner.jsx";
import styles from "./styles.css";

const Button = ({
  children,
  className,
  style,
  kind,
  size,
  icon,
  onClick,
  loading,
  fullWidth,
  width,
  ...props
}) => (
  <button
    className={classNames(
      styles[kind],
      styles[size],
      icon && styles.icon,
      fullWidth && styles.fullWidth,
      className
    )}
    style={width ? { width: `${width}px`, ...style } : style}
    disabled={kind === "disabled" || loading}
    onClick={onClick}
    {...props}>
    {loading ? <Spinner /> : children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.bool,
  width: PropTypes.number,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  kind: PropTypes.oneOf(["primary", "secondary", "disabled"])
};

Button.defaultProps = {
  kind: "primary",
  size: "md",
  icon: false,
  loading: false,
  fullWidth: false
};

export default Button;
