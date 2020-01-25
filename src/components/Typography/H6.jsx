import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { useTruncate } from "../../hooks";
import { classNames, idPropTypeCheckForTruncatedComponents } from "../../utils";

const H6 = ({
  id,
  children,
  className,
  style,
  truncate,
  linesBeforeTruncate
}) => {
  useTruncate(id, truncate, linesBeforeTruncate);
  return (
    <h6 id={id} className={classNames(styles.header6, className)} style={style}>
      {children}
    </h6>
  );
};

H6.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  truncate: PropTypes.bool,
  linesBeforeTruncate: PropTypes.number,
  id: idPropTypeCheckForTruncatedComponents
};

H6.defaultProps = {
  truncate: false,
  linesBeforeTruncate: 1
};

export default H6;
