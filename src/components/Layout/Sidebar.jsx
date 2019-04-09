import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const Sidebar = ({ children, style, className, ...props }) => {
  return (
    <div
      className={classNames(styles.sidebar, className)}
      style={style}
      {...props}>
      {children}
    </div>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};

export default Sidebar;
