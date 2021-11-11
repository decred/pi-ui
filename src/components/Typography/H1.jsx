import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames, idPropTypeCheckForTruncatedComponents } from "../../utils";
import { useTruncate } from "../../hooks";

const H1 = ({
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
    <h1
      id={id}
      className={classNames(styles.header1, className)}
      style={style}
      {...props}>
      {children}
    </h1>
  );
};

H1.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  truncate: PropTypes.bool,
  linesBeforeTruncate: PropTypes.number,
  id: idPropTypeCheckForTruncatedComponents,
};

H1.defaultProps = {
  truncate: false,
  linesBeforeTruncate: 1,
};

export default H1;
