import PropTypes from "prop-types";
import React from "react";
import styles from "./styles.css";

const DropdownItem = ({
	style,
	label,
	itemIndex,
	onSelect,
  ...props,
}) => {
  const handleOnClick = (e) => {
    e.preventDefault();

 };

  return (
    <li onClick={handleOnClick} className={styles.dropdownItem}
      {...props}>
      <span style={style}>
        {label}
      </span>
    </li>
  );
};

DropdownItem.propTypes = {
  onSelect: PropTypes.func.isRequired,
  tabIndex: PropTypes.number.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  label: PropTypes.string,
  vertical: PropTypes.bool
};

export default DropdownItem;
