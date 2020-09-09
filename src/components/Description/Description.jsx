import { PropTypes } from "prop-types";
import React from "react";
import styles from "./styles.css";

const Description = ({ body }) =>
  body && <div className={styles.description}>{body}</div>;

Description.propTypes = {
  body: PropTypes.node
};

export default Description;
