import PropTypes from "prop-types";
import React, { useCallback, useMemo } from "react";
import { animated, useTransition } from "react-spring";
import { classNames } from "../../utils";
import styles from "./styles.css";
import Dropdown from "../Dropdown/Dropdown.jsx";
import DropdownItem from "../Dropdown/DropdownItem.jsx";
import { usePrevious } from "../../hooks";

const SlideAnimatedChild = ({
  activeTabIndex,
  dir,
  slideMaxPosition,
  children,
  contentClassName,
}) => {
  const slideTransition = useTransition(activeTabIndex, {
    initial: {
      position: "absolute",
      overflowY: "hidden",
      opacity: 0,
      left: "40px",
      right: "40px",
    },
    from: {
      position: "absolute",
      overflowY: "hidden",
      opacity: 0,
      left: dir === "r2l" ? `${slideMaxPosition}px` : `-${slideMaxPosition}px`,
      right: dir === "r2l" ? `-${slideMaxPosition}px` : `${slideMaxPosition}px`,
    },
    enter: () => [
      { left: "0px", right: "0px", opacity: 1, overflowY: "hidden" },
      { overflowY: "auto" },
    ],
    leave: () => async (next) => {
      await next({ overflowY: "hidden" });
      await next({
        opacity: 0,
        left:
          dir === "r2l" ? `-${slideMaxPosition}px` : `${slideMaxPosition}px`,
        right:
          dir === "r2l" ? `${slideMaxPosition}px` : `-${slideMaxPosition}px`,
      });
    },
    config: { mass: 1, tension: 210, friction: 26 },
    key: children[activeTabIndex]?.props?.children?.key,
  });
  return slideTransition((contentStyle, item) => (
    <animated.div style={contentStyle} className={contentClassName}>
      {children[item] && children[item].props.children}
    </animated.div>
  ));
};

const FadeAnimatedChild = ({
  activeTabIndex,
  dir,
  slideMaxPosition,
  children,
  contentClassName,
}) => {
  const fadeTransition = useTransition(activeTabIndex, {
    initial: { position: "absolute", opacity: 1 },
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 350 },
    keys: (item) => item,
  });
  return fadeTransition((contentStyle, item) => (
    <animated.div style={contentStyle} className={contentClassName}>
      {children[item] && children[item].props.children}
    </animated.div>
  ));
};

const TabDropdownTrigger = ({
  onClick,
  open,
  ArrowComponent,
  childrenTabs,
  activeTabIndex,
}) => (
  <div className={styles.activeDropdownTabWrapper}>
    {React.Children.map(childrenTabs, (child, index) => {
      if (index === activeTabIndex) {
        return React.cloneElement(child, {
          onClick: onClick,
          className: styles.activeDropdownTabClass,
          isActive: true,
          mode: "dropdown",
        });
      }
    })}
    <ArrowComponent onClick={onClick} open={open} />
  </div>
);

const Tabs = ({
  onSelectTab,
  activeTabIndex,
  style,
  className,
  children,
  wrap,
  mode,
  kind,
  contentClassName,
  contentAnimation,
  ...props
}) => {
  const dropdownMode = mode === "dropdown";
  const vertical = mode === "vertical" || dropdownMode;
  const previousActiveTabIndex = usePrevious(activeTabIndex);
  const renderChildrenTabs = useCallback(() => {
    return React.Children.toArray(children)
      .filter(Boolean)
      .map((child, index) => {
        const element = React.cloneElement(child, {
          "data-testid": `tab-${index}`,
          onSelect: onSelectTab,
          tabIndex: index,
          isActive: index === activeTabIndex,
          mode,
          kind,
        });
        return dropdownMode ? (
          <DropdownItem className={styles.customDropdownItem}>
            {element}
          </DropdownItem>
        ) : (
          element
        );
      });
  }, [children, activeTabIndex, mode, onSelectTab, dropdownMode]);

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
    [vertical, wrap, className, props, renderChildrenTabs, style]
  );

  const getActiveChild = (props) => {
    return (
      <TabDropdownTrigger
        {...props}
        childrenTabs={children}
        activeTabIndex={activeTabIndex}
      />
    );
  };

  const dir = previousActiveTabIndex > activeTabIndex ? "l2r" : "r2l";
  const slideMaxPosition = 1000;

  return (
    <>
      {dropdownMode ? (
        <Dropdown
          customDropdownTrigger={getActiveChild}
          closeOnOutsideClick={true}
          className={className}
          itemsListClassName={classNames(styles.dropdownListClass)}>
          {tabs}
        </Dropdown>
      ) : (
        tabs
      )}
      {contentAnimation === "none" ? (
        <div className={contentClassName}>
          {children[activeTabIndex] && children[activeTabIndex].props.children}
        </div>
      ) : contentAnimation === "slide" ? (
        <SlideAnimatedChild
          activeTabIndex={activeTabIndex}
          dir={dir}
          slideMaxPosition={slideMaxPosition}
          children={children}
          contentClassName={contentClassName}
        />
      ) : (
        <FadeAnimatedChild
          activeTabIndex={activeTabIndex}
          dir={dir}
          slideMaxPosition={slideMaxPosition}
          children={children}
          contentClassName={contentClassName}
        />
      )}
    </>
  );
};

TabDropdownTrigger.propTypes = {
  onClick: PropTypes.func,
  open: PropTypes.bool,
  ArrowComponent: PropTypes.func,
  childrenTabs: PropTypes.node,
  activeTabIndex: PropTypes.number,
};

Tabs.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onSelectTab: PropTypes.func.isRequired,
  activeTabIndex: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  wrap: PropTypes.bool,
  mode: PropTypes.oneOf(["horizontal", "vertical", "dropdown"]),
  kind: PropTypes.oneOf(["primary", "secondary"]),
  contentAnimation: PropTypes.oneOf(["none", "fade", "slide"]),
  contentClassName: PropTypes.string,
};

Tabs.defaultProps = {
  wrap: false,
  mode: "horizontal",
  kind: "primary",
  contentAnimation: "fade",
};

export default Tabs;
