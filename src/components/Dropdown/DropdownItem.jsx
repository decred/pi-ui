import PropTypes from "prop-types";
import React from "react";
import styles from "./styles.css";
import { classNames } from "../../utils";

const DropdownItem = ({
  style,
  label,
  handleClose,
  onClick,
  className,
  ...props
}) => {
  const handleClick = () => {
    handleClose();
    onClick && onClick();
  };
  return (
    <li
      onClick={handleClick}
      className={classNames(styles.dropdownItem)}
      {...props}>
      <span style={style}>{label}</span>
    </li>
  );
};

DropdownItem.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  label: PropTypes.string
};

export default DropdownItem;
