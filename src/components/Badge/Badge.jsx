import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";
import Icon from '../Icon/Icon.jsx';

const Badge = ({ children, iconType, show, onClose, ...props }) => {
	const onCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };
  return (
    <div className={classNames(show ? styles.badgeWrapperVisible : styles.badgeWrapper)}{...props}>
    	<a className={styles.badgeClose} onClick={onCloseClick} href="#">
    		&times;
    	</a>
    	<Icon className={classNames(styles.badgeIcon)} type={iconType} />
      {children}
    </div>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Badge;
