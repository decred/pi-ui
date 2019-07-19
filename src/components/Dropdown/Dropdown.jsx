import PropTypes from "prop-types";
import React from "react";

const Dropdown = ({
  children,
  ...props
}) => {
  const renderChildrenTabs = () => {
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child);
    });
  };

  return (
    <>
      <ul {...props}>
        {renderChildrenTabs()}
      </ul>
    </>
  );
};

Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Dropdown;
