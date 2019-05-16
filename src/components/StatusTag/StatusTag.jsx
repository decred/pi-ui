import React from "react";
import PropTypes from "prop-types";
import activeIcon from "./green_check.png";
import finishedIcon from "./finished.png";
import pendingIcon from "./pending.png";
import watchIcon from "./watch.svg";
import styles from "./styles.css";
import { classNames } from "../../utils";

const getIcon = (type) =>
  ({
    pending: pendingIcon,
    finished: finishedIcon,
    active: activeIcon,
    waiting: watchIcon
  }[type]);

// TODO: replace icons with SVG sprite file ones when we have them
const StatusTag = ({ type, text }) => {
  return (
    <span
      className={classNames(styles.statusTagWrapper, styles[`wrapper${type}`])}>
      <img
        src={getIcon(type)}
        alt={type}
        className={classNames(styles.statusTagIcon, styles[`icon${type}`])}
      />
      <span className={classNames(styles.statusTagSpan, styles[type])}>
        {text || type}
      </span>
    </span>
  );
};

StatusTag.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string
};

StatusTag.defaultProps = {
  type: "active"
};

export default StatusTag;
