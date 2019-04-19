import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";

const SearchInput = ({ placeholder, id }) => {
  return (
    <div className={styles.searchinputWrapper}>
      <input
        className={styles.searchinput}
        type="text"
        id={id}
        placeholder={placeholder}
      />
      <span className={styles.searchinputButton}>&#128269;</span>
    </div>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  id: PropTypes.string
};

export default SearchInput;
