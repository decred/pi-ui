import React from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card.jsx";
import styles from "./styles.css";
import Icon from "../Icon/Icon.jsx";
import { classNames } from "../../utils";

const typeToIcons = {
  info: "info",
  warning: "alert",
  success: "checkmark",
  error: "alert"
};

const Message = ({ style, className, children, kind, ...props }) => {
  return (
    <Card
      className={classNames(styles[kind], className)}
      style={style}
      {...props}>
      <Icon
        type={typeToIcons[kind]}
        className={styles[`icon-${kind}`]}
        size="lg"
      />
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
  kind: "info"
};

export default Message;
