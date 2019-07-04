import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { useTruncate } from "../../hooks";
import { classNames, idPropTypeCheckForTruncatedComponents } from "../../utils";

const H3 = ({
  id,
  children,
  className,
  style,
  truncate,
  linesBeforeTruncate
}) => {
  useTruncate(id, truncate, linesBeforeTruncate);
  return (
    <h3 id={id} className={classNames(styles.header3, className)} style={style}>
      {children}
    </h3>
  );
};

H3.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  truncate: PropTypes.bool,
  linesBeforeTruncate: PropTypes.number,
  id: idPropTypeCheckForTruncatedComponents
};

H3.defaultProps = {
  truncate: false,
  linesBeforeTruncate: 1
};

export default H3;
