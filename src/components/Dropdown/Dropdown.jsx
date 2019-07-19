import PropTypes from "prop-types";
import React from "react";
import styles from './styles.css';
import Icon from '../Icon/Icon';

const Dropdown = ({
  children,
  title,
  handleDropdown,
  show,
  style,
  onSelectItem,
  ...props
}) => {
  const renderChildrenItems = () => {
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
      	style: style,
      	onSelect: onSelectItem, 
        itemIndex: index,
      });
    });
  };

  return (
    <>
    	<div className={styles.headerWrapper} onClick={handleDropdown}>
	    	<span className={styles.dropdownHeader}>{title}</span>
	    	<Icon className={show && styles.dropdownIconRotated} type="up" />
    	</div>
    	{ show &&
	      <ul className={styles.dropdownList} {...props}>
	        {renderChildrenItems()}
	      </ul>
    	}
    </>
  );
};

Dropdown.propTypes = {
	style: PropTypes.object,
	onSelectItem: PropTypes.func,
	show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  handleDropdown: PropTypes.func.isRequired,
};

export default Dropdown;
