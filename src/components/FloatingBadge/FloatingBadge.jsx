import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";
import Icon from '../Icon/Icon.jsx';

const FloatingBadge = ({ children, iconType, ...props }) => {
  return (
    <div className={classNames(styles.badgeWrapper)}{...props}>
    	<Icon className={classNames(styles.badgeIcon)} type={iconType} />
      {children}
    </div>
  );
};

FloatingBadge.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FloatingBadge;
