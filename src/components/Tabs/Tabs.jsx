import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const Tabs = ({
  onSelectTab,
  activeTabIndex,
  style,
  className,
  children,
  vertical,
  ...props
}) => {
  const renderChildrenTabs = () => {
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        onSelect: onSelectTab,
        tabIndex: index,
        isActive: index === activeTabIndex,
        vertical: vertical
      });
    });
  };

  const renderActiveTabContent = () => {
    if (children[activeTabIndex]) {
      return children[activeTabIndex].props.children;
    }
  };

  return (
    <>
      <ul
        className={`${
          vertical ? styles.tabsNavVertical : styles.tabsNav
        } ${className}`}
        style={style}
        {...props}>
        {renderChildrenTabs()}
      </ul>
      {renderActiveTabContent()}
    </>
  );
};

Tabs.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onSelectTab: PropTypes.func.isRequired,
  activeTabIndex: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  vertical: PropTypes.bool
};

Tabs.defaultProps = {
  className: "",
  vertical: false
};

export default Tabs;
