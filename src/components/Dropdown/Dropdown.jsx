import PropTypes from "prop-types";
import React from "react";

const Dropdown = ({
  children,
  title,
  handleClick,
  show,
  ...props
}) => {
  const renderChildrenTabs = () => {
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child);
    });
  };

  return (
    <>
    	<span onClick={handleClick}>{title}</span>
    	{ show &&
	      <ul {...props}>
	        {renderChildrenTabs()}
	      </ul>
    	}
    </>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Dropdown;
