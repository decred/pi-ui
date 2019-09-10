import PropTypes from "prop-types";
import React, { useCallback, useMemo } from "react";
import { animated, useTransition } from "react-spring";
import { classNames } from "../../utils";
import styles from "./styles.css";
import Dropdown from "../Dropdown/Dropdown.jsx";

const Tabs = ({
  onSelectTab,
  activeTabIndex,
  style,
  className,
  children,
  wrap,
  mode,
  ...props
}) => {
  const dropdownMode = mode === "dropdown";
  const vertical = mode === "vertical" || dropdownMode;
  const renderChildrenTabs = useCallback(() => {
    return React.Children.map(children, (child, index) => {
      return React.cloneElement(child, {
        onSelect: onSelectTab,
        tabIndex: index,
        isActive: index === activeTabIndex,
        mode
      });
    });
  }, [children, activeTabIndex, mode]);

  const tabs = useMemo(
    () => (
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
    ),
    [vertical, wrap, className, props, renderChildrenTabs]
  );

  const getActiveChild = ({ onClick, open, ArrowComponent }) => {
    return (
      <div className={styles.activeDropdownTabWrapper}>
        {React.Children.map(children, (child, index) => {
          if (index === activeTabIndex) {
            return React.cloneElement(child, {
              onClick: onClick,
              className: classNames(
                dropdownMode && styles.activeDropdownTabClass
              ),
              mode
            });
          }
        })}
        <ArrowComponent onClick={onClick} open={open} />
      </div>
    );
  };

  const transitions = useTransition(activeTabIndex, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 350 }
  });

  return (
    <>
      {dropdownMode ? (
        <Dropdown
          customDropdownTrigger={getActiveChild}
          closeOnOutsideClick={true}
          itemsListClassName={classNames(styles.dropdownListClass)}>
          {tabs}
        </Dropdown>
      ) : (
        tabs
      )}
      {transitions.map(({ item, key, props }) => {
        return (
          item === activeTabIndex && (
            <animated.div key={key} style={props}>
              {children[item] && children[item].props.children}
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
  wrap: PropTypes.bool,
  mode: PropTypes.oneOf(["horizontal", "vertical", "dropdown"])
};

Tabs.defaultProps = {
  wrap: false,
  mode: "horizontal"
};

export default Tabs;
