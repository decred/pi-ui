import PropTypes from "prop-types";
import React from "react";
import Icon from "../Icon/Icon";
import { classNames } from "../../utils";
import Spinner from "../Spinner/Spinner";
import styles from "./styles.css";

const ButtonIcon = ({
  type,
  className,
  style,
  disabled,
  onClick,
  loading,
  viewBox,
  ...props
}) => (
  <button
    type="button"
    className={classNames(styles.buttonIcon, className)}
    style={style}
    disabled={disabled}
    onClick={onClick}
    {...props}>
    {loading ? <Spinner /> : <Icon type={type} viewBox={viewBox} />}
  </button>
);

ButtonIcon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

export default ButtonIcon;
