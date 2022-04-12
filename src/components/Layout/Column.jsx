import React from "react";
import PropTypes from "prop-types";
import { classNames } from "../../utils";
import grid from "./grid.module.css";
import styles from "./styles.module.css";
import isNumber from "lodash/isNumber";

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
  const base = [xs, sm, md, lg, xl].find((bp) => isNumber(bp));
  return (
    <div
      className={classNames(
        styles.column,
        grid[`xs-${base}`],
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
  xs: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  sm: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  md: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  lg: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  xl: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
};

export default Column;
