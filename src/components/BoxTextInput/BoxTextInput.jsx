import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { classNames } from "../../utils";
import Icon from "../Icon/Icon.jsx";
import Tooltip from "../Tooltip/Tooltip.jsx";

const FormWrapper = ({ className, onSubmit, children }) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

const DefaultWrapper = ({ className, onSubmit, children }) => {
  return (
    <div className={className} onSubmit={onSubmit}>
      {children}
    </div>
  );
};

const BoxTextInput = ({
  value,
  onChange,
  placeholder,
  id,
  onSubmit,
  error,
  rounded,
  searchInput,
  className,
  inputClassName,
  tooltipInfo,
  tooltipPlacement,
  ...props
}) => {
  const handleSubmit = (e) => {
    e && e.preventDefault();
    onSubmit && onSubmit();
  };
  const Wrapper = searchInput ? FormWrapper : DefaultWrapper;
  return (
    <Wrapper
      className={classNames(styles.boxtextinputWrapper, className)}
      onSubmit={handleSubmit}>
      <input
        className={classNames(
          styles.boxtextinput,
          error && styles.boxTextInputError,
          rounded && styles.boxTextInputRounded,
          inputClassName
        )}
        type="text"
        onChange={onChange}
        value={value}
        id={id}
        placeholder={placeholder}
        {...props}
      />
      {searchInput && (
        <button
          type="submit"
          className={styles.boxtextinputButton}
          data-testid="submit-button">
          <Icon type="search" />
        </button>
      )}
      {tooltipInfo && (
        <span className={styles.boxtextinputButton}>
          <Tooltip content={tooltipInfo} placement={tooltipPlacement}>
            <Icon type="info" />
          </Tooltip>
        </span>
      )}
      <p
        className={classNames(styles.errorMsg, error && styles.errorMsgActive)}>
        {error}
      </p>
    </Wrapper>
  );
};

FormWrapper.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node,
};

DefaultWrapper.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node,
};

BoxTextInput.propTypes = {
  placeholder: PropTypes.node,
  id: PropTypes.string,
  onSubmit: PropTypes.func,
  error: PropTypes.node,
  rounded: PropTypes.bool,
  searchInput: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  onChange: PropTypes.func,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  tooltipInfo: PropTypes.node,
  tooltipPlacement: PropTypes.string,
};

BoxTextInput.defaultProps = {
  rounded: false,
  searchInput: false,
};

export default BoxTextInput;
