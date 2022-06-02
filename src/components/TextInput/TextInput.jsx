import PropTypes from "prop-types";
import React from "react";
import { classNames } from "../../utils";
import Icon from "../Icon/Icon.jsx";
import styles from "./styles.module.css";
import { useMountEffect } from "../../hooks";

const TextInput = ({
  children,
  type,
  label,
  placeholder,
  id,
  error,
  success,
  autoFocus,
  wrapperClassNames,
  inputClassNames,
  labelClassNames,
  messageClassNames,
  ...props
}) => {
  const input = React.useRef(null);
  useMountEffect(() => {
    autoFocus && input && input.current.focus();
  });
  
  const isPlaceholder = (placeholder) => {
    if (placeholder == undefined)
      return false;
    
    if (placeholder.lenght)
      return true;
  }
  
  return (
    <div
      className={classNames(
        styles.textinputWrapper,
        error && styles.error,
        success && styles.success,
        wrapperClassNames,
        !label && styles.withoutLabel
      )}> 
      <input
        id={id}
        ref={input}
        placeholder={placeholder || " "}
        size={isPlaceholder(placeholder) ? placeholder.length : undefined}
        className={classNames(styles.textinput, inputClassNames)}
        type={type}
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className={classNames(
            styles.textinputLabel,
            placeholder && styles.staticTextInputLabel,
            labelClassNames
          )}>
          {label}
        </label>
      )}
      <div>
        {children && <div className={styles.childrenWrapper}>{children}</div>}
        {error && (
          <Icon
            type="alert"
            backgroundColor="#ed6d47"
            iconColor="#feb8a5"
            className={styles.errorIcon}
          />
        )}
        {success && (
          <Icon
            type="checkmark"
            backgroundColor="#41bf53"
            iconColor="#c6eccb"
            className={styles.successIcon}
          />
        )}
      </div>
      <p className={classNames(styles.message, messageClassNames)}>
        {error}
        {success}
      </p>
    </div>
  );
};

TextInput.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  label: PropTypes.node,
  placeholder: PropTypes.node,
  id: PropTypes.string.isRequired,
  error: PropTypes.node,
  success: PropTypes.node,
  autoFocus: PropTypes.bool,
  wrapperClassNames: PropTypes.string,
  inputClassNames: PropTypes.string,
  labelClassNames: PropTypes.string,
  messageClassNames: PropTypes.string,
  style: PropTypes.object,
};

TextInput.defaultProps = {
  type: "text",
};

export default TextInput;
