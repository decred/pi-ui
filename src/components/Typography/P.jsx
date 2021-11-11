import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { useTruncate } from "../../hooks";
import { classNames, idPropTypeCheckForTruncatedComponents } from "../../utils";

const P = ({
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
    <p
      id={id}
      className={classNames(styles.paragraph, className)}
      style={style}
      {...props}>
      {children}
    </p>
  );
};

P.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  truncate: PropTypes.bool,
  linesBeforeTruncate: PropTypes.number,
  id: idPropTypeCheckForTruncatedComponents,
};

P.defaultProps = {
  truncate: false,
  linesBeforeTruncate: 1,
};
export default P;
