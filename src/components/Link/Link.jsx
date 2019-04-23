import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const Link = ({ href, children }) => {
  return (
    <a className={styles.link} href={href}>
      {children}
    </a>
  );
};

Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Link;
