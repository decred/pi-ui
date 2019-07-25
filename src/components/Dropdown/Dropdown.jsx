import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";
import styles from './styles.css';
import Icon from '../Icon/Icon.jsx';

const Dropdown = ({
  children,
  title,
  onDropdownClick,
  show,
  style,
  onSelectItem,
  closeOnOutsideClick,
  ...props
}) => {
	const renderChildrenItems = () => {
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
      	style: style,
      	onSelect: onSelectItem, 
        itemindex: index,
      });
    });
  };

	function useOutsideAlerter(ref) {
	  function handleClickOutside(event) {
	    if (ref.current && !ref.current.contains(event.target)) {
	      onDropdownClick();
	    }
	  }

	 	useEffect(() => {
	    document.addEventListener("mousedown", handleClickOutside);
	    return () => {
	      document.removeEventListener("mousedown", handleClickOutside);
	   	};
	 	});
	}

	const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const WithRef = ({ show, children, className, closeOnOutsideClick }) => (
  	show && closeOnOutsideClick
  	?
		  <div ref={wrapperRef} className={className}>
		    {children}
		  </div>
	  : 
		  <div className={className}>
		    {children}
		  </div>
	);

  return (
    <WithRef show={show} className={styles.dropdownWrapper} closeOnOutsideClick={closeOnOutsideClick}>
    	<div className={styles.headerWrapper} onClick={onDropdownClick}>
	    	<span className={styles.dropdownHeader}>{title}</span>
	    	<Icon className={show && styles.dropdownIconRotated} type="up" />
    	</div>
    	{ show &&
	      <ul className={styles.dropdownList}  {...props}>
	        {renderChildrenItems()}
	      </ul>
    	}
    </WithRef>
  );
};

Dropdown.propTypes = {
	style: PropTypes.object,
	onSelectItem: PropTypes.func,
	show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onDropdownClick: PropTypes.func.isRequired,
  closeOnOutsideClick: PropTypes.bool.isRequired,
};

export default Dropdown;
