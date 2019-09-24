import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { animated, useTransition } from "react-spring";
import useClickOutside from "../../hooks/useClickOutside";
import { classNames } from "../../utils";
import styles from "./styles.css";

const Arrow = ({ open, onClick, className }) => (
  <div
    onClick={onClick}
    className={classNames(styles.arrowAnchor, open && styles.open, className)}
  />
);

const DefaultTrigger = ({
  onClick,
  title,
  open,
  dropdownArrowClassName,
  ArrowComponent = Arrow
}) => (
  <div className={styles.headerWrapper} onClick={onClick}>
    <span className={styles.dropdownHeader}>{title}</span>
    <ArrowComponent
      onClick={onClick}
      open={open}
      className={dropdownArrowClassName}
    />
  </div>
);

const Dropdown = ({
  children,
  className,
  title,
  itemsListClassName,
  onDropdownClick,
  show,
  closeOnOutsideClick,
  closeOnItemClick,
  customDropdownTrigger,
  dropdownArrowClassName,
  ...props
}) => {
  const [innerStateShow, setInnerStateShow] = useState(false);
  const dropdownOpenned = show || innerStateShow;
  const closeDropdown = useCallback(() => {
    setInnerStateShow(false);
  }, [setInnerStateShow]);

  const closeDropdownHandler =
    closeOnOutsideClick && dropdownOpenned
      ? onDropdownClick || closeDropdown
      : () => null;
  const [dropdownRef] = useClickOutside(closeDropdownHandler);
  const [customTriggerWidth, setCustomTriggerWidth] = useState(0);
  const dropdownListRef = useCallback((node) => {
    if (node !== null) {
      setCustomTriggerWidth(node.getBoundingClientRect().width);
    }
  }, []);
  const handleTriggerClick = useCallback(() => {
    if (!onDropdownClick) {
      setInnerStateShow(!innerStateShow);
      return;
    }
    onDropdownClick();
  }, [setInnerStateShow, onDropdownClick, innerStateShow]);

  const Trigger = customDropdownTrigger || DefaultTrigger;

  const handleCloseOnItemClick = () => {
    if (closeOnItemClick) {
      closeDropdownHandler();
    }
  };

  const renderChildrenItems = () => {
    return React.Children.toArray(children)
      .filter(Boolean)
      .map((child, index) => {
        switch (child.type) {
          case "ul":
            // special for tabs-dropdown child won't have 'handleClose' prop
            return React.cloneElement(child, {
              itemindex: index,
              onClick: handleCloseOnItemClick
            });
          default:
            return React.cloneElement(child, {
              handleClose: handleCloseOnItemClick,
              itemindex: index
            });
        }
      });
  };

  const transitions = useTransition(dropdownOpenned, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    duration: 200
  });
  return (
    <div
      ref={dropdownRef}
      className={classNames(styles.dropdownWrapper, className)}
      style={{
        width: customDropdownTrigger && customTriggerWidth
      }}
      {...props}>
      <Trigger
        title={title}
        onClick={handleTriggerClick}
        open={dropdownOpenned}
        dropdownArrowClassName={dropdownArrowClassName}
        ArrowComponent={Arrow}
      />
      {dropdownOpenned &&
        transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.ul
                className={classNames(styles.dropdownList, itemsListClassName)}
                key={key}
                ref={dropdownListRef}
                style={props}>
                {renderChildrenItems()}
              </animated.ul>
            )
        )}
    </div>
  );
};

DefaultTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  open: PropTypes.bool,
  dropdownArrowClassName: PropTypes.string,
  ArrowComponent: PropTypes.func
};

Arrow.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string
};

Dropdown.propTypes = {
  className: PropTypes.string,
  itemsListClassName: PropTypes.string,
  dropdownArrowClassName: PropTypes.string,
  customDropdownTrigger: PropTypes.func,
  title: PropTypes.string,
  show: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onDropdownClick: PropTypes.func,
  closeOnOutsideClick: PropTypes.bool,
  closeOnItemClick: PropTypes.bool
};

Dropdown.defaultProps = {
  closeOnOutsideClick: true,
  closeOnItemClick: true
};

export default Dropdown;
