import React from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card.jsx";
import styles from "./styles.css";
import Icon from "../Icon/Icon.jsx";
import { classNames } from "../../utils";
import H2 from "../Typography/H2.jsx";

const typeToIcons = {
  info: "info",
  warning: "alert",
  success: "checkmark",
  error: "alert",
  blocked: "blocked",
};

const Message = ({
  style,
  className,
  iconContainerClassName,
  children,
  kind,
  title,
  ...props
}) => {
  const renderIcon = () => (
    <Icon
      type={typeToIcons[kind]}
      className={styles[`icon-${kind}`]}
      size="lg"
    />
  );
  return (
    <Card
      className={classNames(
        styles[kind],
        !!title && styles.withTitle,
        className
      )}
      style={style}
      {...props}>
      {kind && (
        <div
          className={classNames(styles.iconContainer, iconContainerClassName)}>
          {renderIcon()}
        </div>
      )}
      <div className={styles.content}>
        {!!title && <H2>{title}</H2>}
        {children}
      </div>
    </Card>
  );
};

Message.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  iconContainerClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  kind: PropTypes.oneOf(["info", "warning", "error", "success", "blocked"]),
  title: PropTypes.string,
};
Message.defaultProps = {
  kind: "info",
};

export default Message;
