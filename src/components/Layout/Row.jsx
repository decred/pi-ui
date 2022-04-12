import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { classNames } from "../../utils";

function Row({ className, style, children, ...props }) {
  return (
    <div className={classNames(styles.row, className)} style={style} {...props}>
      {children}
    </div>
  );
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Row;
