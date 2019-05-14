import React from "react";
import PropTypes from "prop-types";
import activeIcon from "./green_check.png";
import finishedIcon from "./finished.png";
import pendingIcon from "./pending.png";
import styles from "./styles.css";
import { classNames } from "../../utils";

const getIcon = (type) =>
  ({
    pending: pendingIcon,
    finished: finishedIcon,
    active: activeIcon
  }[type]);

// TODO: replace icons with SVG when we have them
const StatusTag = ({ type }) => {
  return (
    <div
      className={classNames(styles.statusTagWrapper, styles[`wrapper${type}`])}>
      <img
        src={getIcon(type)}
        alt={type}
        className={classNames(styles.statusTagIcon, styles[`icon${type}`])}
      />
      <span className={classNames(styles.statusTagSpan, styles[type])}>
        {type}
      </span>
    </div>
  );
};

StatusTag.propTypes = {
  type: PropTypes.string
};

StatusTag.defaultProps = {
  type: "active"
};

export default StatusTag;
