import React from "react";
import PropTypes from "prop-types";
import { classNames } from "../../utils";
import grid from "./grid.module.css";
import styles from "./styles.module.css";

const Column = ({
  children,
  style,
  className,
  xs,
  sm,
  md,
  lg,
  xl,
  ...props
}) => {
  return (
    <div
      className={classNames(
        styles.column,
        grid[`xs-${xs}`],
        grid[`sm-${sm}`],
        grid[`md-${md}`],
        grid[`lg-${lg}`],
        grid[`xl-${xl}`],
        className
      )}
      style={style}
      {...props}>
      {children}
    </div>
  );
};

Column.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  xs: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  sm: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  md: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  lg: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  xl: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
};

export default Column;
