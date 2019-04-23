import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

// TODO: use SVG icon when we have it
const SearchInput = ({ placeholder, id, onSubmit, ...props }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit();
  };
  return (
    <form className={styles.searchinputWrapper} onSubmit={handleSubmit}>
      <input
        className={styles.searchinput}
        type="text"
        id={id}
        placeholder={placeholder}
        {...props}
      />
      <input
        type="submit"
        value="&#128269;"
        className={styles.searchinputButton}
      />
    </form>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  id: PropTypes.string,
  onSubmit: PropTypes.func
};

export default SearchInput;
