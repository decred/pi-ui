import PropTypes from "prop-types";
import React from "react";
import styles from "./styles.module.css";
import { classNames } from "../../utils";

const DropdownItem = ({
  handleClose,
  onClick,
  className,
  children,
  ...props
}) => {
  const handleClick = () => {
    handleClose && handleClose();
    onClick && onClick();
  };
  return (
    <li
      onClick={handleClick}
      className={classNames(styles.dropdownItem, className)}
      {...props}>
      {children}
    </li>
  );
};

DropdownItem.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  handleClose: PropTypes.func,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default DropdownItem;
