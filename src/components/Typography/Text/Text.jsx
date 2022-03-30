import PropTypes from "prop-types";
import React from "react";
import { useTruncate } from "../../../hooks";
import {
  classNames,
  idPropTypeCheckForTruncatedComponents,
} from "../../../utils";
import styles from "./styles.module.css";

const TEXT_ALIGN_MAP = {
  center: styles.textAlignCenter,
  start: styles.textAlignStart,
  end: styles.textAlignEnd,
};

const SIZE_MAP = {
  small: styles.sizeSmall,
  normal: styles.sizeNormal,
  large: styles.sizeLarge,
  xlarge: styles.sizeXLarge,
};

const WEIGHT_MAP = {
  light: styles.weightLight,
  regular: styles.weightRegular,
  semibold: styles.weightSemiBold,
  bold: styles.weightBold,
};

const COLOR_MAP = {
  default: styles.colorDefault,
  primary: styles.colorPrimary,
  primaryDark: styles.colorPrimaryDark,
  primaryLight: styles.colorPrimaryLight,
  gray: styles.colorGray,
  grayDark: styles.colorGrayDark,
  green: styles.colorGreen,
  yellow: styles.colorYellow,
  orange: styles.colorOrange,
};

const BG_COLOR_MAP = {
  blueLighter: styles.bgColorBlueLighter,
};

const Text = ({
  id,
  textAlign,
  weight,
  color,
  size,
  monospace,
  backgroundColor,
  className,
  truncate,
  truncateTrigger,
  linesBeforeTruncate,
  ...props
}) => {
  useTruncate(id, truncate, linesBeforeTruncate, truncateTrigger);
  const textAlignClass = TEXT_ALIGN_MAP[textAlign];
  const weightClass = WEIGHT_MAP[weight];
  const sizeClass = SIZE_MAP[size];
  const colorClass = COLOR_MAP[color];
  const backgroundColorClass = BG_COLOR_MAP[backgroundColor];

  return (
    <span
      id={id}
      className={classNames(
        styles.text,
        monospace && styles.monospace,
        textAlignClass,
        weightClass,
        sizeClass,
        colorClass,
        backgroundColorClass,
        className
      )}
      {...props}
    />
  );
};

Text.propTypes = {
  textAlign: PropTypes.oneOf(Object.keys(TEXT_ALIGN_MAP)),
  weight: PropTypes.oneOf(Object.keys(WEIGHT_MAP)),
  size: PropTypes.oneOf(Object.keys(SIZE_MAP)),
  color: PropTypes.oneOf(Object.keys(COLOR_MAP)),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.oneOf(Object.keys(BG_COLOR_MAP)),
  truncate: PropTypes.bool,
  monospace: PropTypes.bool,
  linesBeforeTruncate: PropTypes.number,
  id: idPropTypeCheckForTruncatedComponents,
  truncateTrigger: PropTypes.bool,
};

Text.defaultProps = {
  textAlign: "start",
  weight: "regular",
  size: "normal",
  color: "default",
  truncate: false,
  monospace: false,
  linesBeforeTruncate: 1,
};

export default Text;
