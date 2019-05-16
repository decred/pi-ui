import React from "react";
import PropTypes from "prop-types";
import Spinner from "../Spinner/Spinner.jsx";
import styles from "./styles.css";
import { classNames } from "../../utils";

const Button = ({
  children,
  className,
  style,
  kind,
  onClick,
  loading,
  fullWidth,
  ...props
}) => (
  <button
    className={classNames(
      styles[kind],
      fullWidth && styles.fullWidth,
      className
    )}
    style={style}
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
  kind: PropTypes.oneOf(["primary", "secondary", "disabled"])
};

Button.defaultProps = {
  kind: "primary",
  loading: false,
  fullWidth: false
};

export default Button;
