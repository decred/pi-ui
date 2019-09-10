import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const Badge = ({ children, icon, show, onClose, ...props }) => {
  const onCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };
  return (
    <div
      className={classNames(
        show ? styles.badgeWrapperVisible : styles.badgeWrapper
      )}
      {...props}>
      <a className={styles.badgeClose} onClick={onCloseClick} href="#">
        &times;
      </a>
      <div className={styles.badgeIcon}>{icon}</div>
      {children}
    </div>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  icon: PropTypes.node
};

export default Badge;
