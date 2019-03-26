import React from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card.jsx";
import styles from "./styles.css";

// TODO: use svg icons when we have them
const Message = ({ style, className, children, kind, ...props }) => {
  return (
    <Card className={styles[kind]} style={style} {...props}>
      {children}
    </Card>
  );
};

Message.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  kind: PropTypes.oneOf(["info", "warning", "error", "success"])
};
Message.defaultProps = {
  kind: "info",
  className: ""
};

export default Message;
