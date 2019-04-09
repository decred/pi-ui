import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const Container = ({ children, style, className, ...props }) => {
  return (
    <div
      className={classNames(styles.container, className)}
      style={style}
      {...props}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
};

export default Container;
