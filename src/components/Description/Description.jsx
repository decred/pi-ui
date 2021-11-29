import { PropTypes } from "prop-types";
import React from "react";
import styles from "./styles.css";
import { classNames } from "../../utils";

const Description = ({ body, style, className }) =>
  body && (
    <div className={classNames(styles.description, className)} style={style}>
      {body}
    </div>
  );

Description.propTypes = {
  body: PropTypes.node.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Description;
