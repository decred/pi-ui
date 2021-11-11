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
  noBorder,
  width,
  type,
  ...props
}) => (
  <button
    type={type}
    className={classNames(
      styles[kind],
      styles[size],
      icon && styles.icon,
      fullWidth && styles.fullWidth,
      noBorder && styles.noBorder,
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
  type: PropTypes.oneOf(["button", "submit"]),
  kind: PropTypes.oneOf(["primary", "secondary", "disabled"]),
  noBorder: PropTypes.bool,
};

Button.defaultProps = {
  kind: "primary",
  size: "md",
  type: "button",
  icon: false,
  loading: false,
  fullWidth: false,
  noBorder: false,
};

export default Button;
