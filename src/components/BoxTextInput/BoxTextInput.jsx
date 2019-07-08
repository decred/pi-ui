import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";
import searchSVG from "./search.svg";

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

// TODO: use SVG icon when we have it
const BoxTextInput = ({
  value,
  onChange,
  placeholder,
  id,
  onSubmit,
  error,
  rounded,
  searchInput,
  ...props
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit();
  };
  const Wrapper = searchInput ? FormWrapper : DefaultWrapper;
  return (
    <Wrapper className={styles.boxtextinputWrapper} onSubmit={handleSubmit}>
      <input
        className={classNames(
          styles.boxtextinput,
          error && styles.boxTextInputError,
          rounded && styles.boxTextInputRounded
        )}
        type="text"
        onChange={onChange}
        value={value}
        id={id}
        placeholder={placeholder}
        {...props}
      />
      {searchInput && (
        <button type="submit" className={styles.boxtextinputButton}>
          <img type="image" src={searchSVG} alt="Submit" />
        </button>
      )}
      <p
        className={classNames(styles.errorMsg, error && styles.errorMsgActive)}>
        {error}
      </p>
    </Wrapper>
  );
};

BoxTextInput.propTypes = {
  placeholder: PropTypes.string,
  id: PropTypes.string,
  onSubmit: PropTypes.func,
  error: PropTypes.string,
  rounded: PropTypes.bool,
  searchInput: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func
};

BoxTextInput.defaultProps = {
  rounded: false,
  searchInput: false
};

export default BoxTextInput;
