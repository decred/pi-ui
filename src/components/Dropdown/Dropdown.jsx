import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { animated, useTransition } from "react-spring";
import useClickOutside from "../../hooks/useClickOutside";
import { classNames } from "../../utils";
import styles from "./styles.css";

const DefaultTrigger = ({ onClick, title, open, dropdownArrowClassName }) => (
  <div className={styles.headerWrapper} onClick={onClick}>
    <span className={styles.dropdownHeader}>{title}</span>
    <div
      className={classNames(
        styles.arrowAnchor,
        open && styles.open,
        dropdownArrowClassName
      )}
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

  const handleTriggerClick = useCallback(() => {
    if (!onDropdownClick) {
      setInnerStateShow(!innerStateShow);
      return;
    }
    onDropdownClick();
  }, [setInnerStateShow, onDropdownClick, innerStateShow]);

  const Trigger = customDropdownTrigger || DefaultTrigger;
  const isCustomTriggerMode = !!customDropdownTrigger;

  const handleCloseOnItemClick = () => {
    if (closeOnItemClick) {
      closeDropdownHandler();
    }
  };

  const renderChildrenItems = () => {
    return React.Children.toArray(children)
      .filter(Boolean)
      .map((child, index) => {
        return React.cloneElement(child, {
          handleClose: handleCloseOnItemClick,
          itemindex: index,
          onClick: handleCloseOnItemClick
        });
      });
  };

  const transitions = useTransition(dropdownOpenned, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    duration: 200
  });

  return (
    <div
      ref={dropdownRef}
      className={classNames(styles.dropdownWrapper, className)}
      {...props}>
      <Trigger
        title={title}
        onClick={handleTriggerClick}
        open={dropdownOpenned}
        dropdownArrowClassName={dropdownArrowClassName}
      />
      {isCustomTriggerMode && (
        <div
          className={classNames(
            styles.arrowAnchor,
            styles.customArrowAnchor,
            dropdownOpenned && styles.open,
            dropdownArrowClassName
          )}
        />
      )}
      {dropdownOpenned &&
        transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.ul
                className={classNames(styles.dropdownList, itemsListClassName)}
                key={key}
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
  dropdownArrowClassName: PropTypes.string
};

Dropdown.propTypes = {
  className: PropTypes.string,
  itemsListClassName: PropTypes.string,
  dropdownArrowClassName: PropTypes.string,
  customDropdownTrigger: PropTypes.node,
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
