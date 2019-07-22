import PropTypes from "prop-types";
import React, { useRef, useEffect } from "react";
import styles from './styles.css';
import Icon from '../Icon/Icon.jsx';

const Dropdown = ({
  children,
  title,
  handleDropdown,
  show,
  style,
  onSelectItem,
  closeOutsideClick,
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
	      handleDropdown();
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

  const WithRef = ({ show, children, className, closeOutsideClick }) => (
  	show && closeOutsideClick
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
    <WithRef show={show} className={styles.dropdownWrapper} closeOutsideClick={closeOutsideClick}>
    	<div className={styles.headerWrapper} onClick={handleDropdown}>
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
  handleDropdown: PropTypes.func.isRequired,
  closeOutsideClick: PropTypes.bool.isRequired,
};

export default Dropdown;
