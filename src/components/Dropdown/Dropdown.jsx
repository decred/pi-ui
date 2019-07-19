import PropTypes from "prop-types";
import React from "react";
import styles from './styles.css';

const Dropdown = ({
  children,
  title,
  handleClick,
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
    	<span className={styles.dropdownHeader} onClick={handleClick}>{title}</span>
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
  handleClick: PropTypes.func.isRequired,
};

export default Dropdown;
