import PropTypes from "prop-types";
import React from "react";
import Text from "../Typography/Text/Text.jsx";
import { classNames, idPropTypeCheckForTruncatedComponents } from "../../utils";
import styles from "./styles.module.css";

const TextHighlighted = ({ id, truncate, className, style, children }) => (
  <Text
    {...{
      id,
      truncate,
      style,
      className: classNames(styles.contentWrapper, className),
    }}
    style={style}>
    {children}
  </Text>
);

TextHighlighted.propTypes = {
  id: idPropTypeCheckForTruncatedComponents,
  truncate: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

TextHighlighted.defaultProps = {
  truncate: true,
};

export default TextHighlighted;
