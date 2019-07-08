import PropTypes from "prop-types";
import React from "react";
import { animated, useTransition } from "react-spring";
import { classNames } from "../../utils";
import styles from "./styles.css";

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

  const transitions = useTransition(activeTabIndex, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 350 }
  });

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
      {transitions.map(({ item, key, props }) => {
        return (
          item === activeTabIndex && (
            <animated.div key={key} style={props}>
              {children[item].props.children}
            </animated.div>
          )
        );
      })}
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
