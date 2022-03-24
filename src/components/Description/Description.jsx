import { PropTypes } from "prop-types";
import React from "react";
import styles from "./styles.module.css";
import { classNames } from "../../utils";

const Description = ({ body, style, className }) =>
  body ? (
    <div className={classNames(styles.description, className)} style={style}>
      {body}
    </div>
  ) : null;

Description.propTypes = {
  body: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Description;
