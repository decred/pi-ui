import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const Tabs = ({
  onSelectTab,
  activeTabIndex,
  style,
  className,
  children,
  vertical,
  wrap,
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
        className={classNames(
          vertical ? styles.tabsNavVertical : styles.tabsNav,
          wrap && styles.wrap,
          className
        )}
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
  vertical: PropTypes.bool,
  wrap: PropTypes.bool
};

Tabs.defaultProps = {
  vertical: false,
  wrap: false
};

export default Tabs;
