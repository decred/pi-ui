import PropTypes from "prop-types";
import React from "react";
import { classNames } from "../../utils";
import Icon from "../Icon/Icon.jsx";
import styles from "./styles.css";

const TextArea = ({
  type,
  label,
  id,
  error,
  wrapperClassNames,
  inputClassNames,
  ...props
}) => {
  return (
    <div className={classNames(styles.textAreaWrapper, wrapperClassNames)}>
      <textarea
        id={id}
        placeholder=""
        className={classNames(
          styles.textArea,
          error && styles.textAreaError,
          inputClassNames
        )}
        type={type}
        {...props}
      />
      <Icon
        type="alert"
        backgroundColor="#ed6d47"
        iconColor="#feb8a5"
        className={classNames(
          styles.errorIcon,
          error && styles.errorIconActive
        )}
      />
      <p
        className={classNames(styles.errorMsg, error && styles.errorMsgActive)}>
        {error}
      </p>
    </div>
  );
};

TextArea.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
  wrapperClassNames: PropTypes.string,
  inputClassNames: PropTypes.string
};

TextArea.defaultProps = {
  type: "text",
  label: "Label"
};

export default TextArea;
