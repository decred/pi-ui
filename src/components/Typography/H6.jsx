import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { useTruncate } from "../../hooks";
import { classNames, idPropTypeCheckForTruncatedComponents } from "../../utils";

const H6 = ({
  id,
  children,
  className,
  style,
  truncate,
  linesBeforeTruncate,
  ...props
}) => {
  useTruncate(id, truncate, linesBeforeTruncate);
  return (
    <h6
      id={id}
      className={classNames(styles.header6, className)}
      style={style}
      {...props}>
      {children}
    </h6>
  );
};

H6.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  truncate: PropTypes.bool,
  linesBeforeTruncate: PropTypes.number,
  id: idPropTypeCheckForTruncatedComponents,
};

H6.defaultProps = {
  truncate: false,
  linesBeforeTruncate: 1,
};

export default H6;
