import PropTypes from "prop-types";
import React from "react";
import styles from "./styles.css";

const DropdownItem = ({
	style,
	label,
	itemIndex,
	handleItemClick,
  ...props,
}) => {
	const handleClick = () => {
		handleItemClick()
	}
  return (
    <li onClick={handleClick} className={styles.dropdownItem}
      {...props}>
      <span style={style}>
        {label}
      </span>
    </li>
  );
};

DropdownItem.propTypes = {
  tabIndex: PropTypes.number.isRequired,
  handleItemClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  label: PropTypes.string,
};

export default DropdownItem;
