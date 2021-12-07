import React from "react";
import ReactSelect, { components } from "react-select";
import PropTypes from "prop-types";
import { classNames } from "../../utils";
import styles from "./styles.css";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <div
        className={classNames(
          styles.arrowAnchor,
          props.selectProps.menuIsOpen && styles.arrowAnchorOpen
        )}
      />
    </components.DropdownIndicator>
  );
};

DropdownIndicator.propTypes = {
  selectProps: PropTypes.object,
};

const Select = ({ width, ...props }) => {
  const customStyles = {
    indicatorSeparator: () => ({
      display: "none"
    }),
    container: (provided) => ({
      ...provided,
      width: width ? width : provided.width,
      padding: "0.2rem 0 0.2rem 0.4rem"
    }),
    control: (provided) => ({
        ...provided,
        "user-select": "none",
        "box-shadow": "none",
        "border-radius": "0.2rem",
        "min-height": "3rem",
        "min-width": "6rem",
        "border-color": "var(--input-border-color)",
        "background-color": "var(--card-background)",
        "&:hover": {
          "border-color": "var(--input-border-color)",
        }
    }),
    menu: (provided) => ({
        ...provided,
        "z-index": "999",
        "box-shadow": "0px 1rem 2rem rgba(0, 0, 0, 0.16)",
        "border-radius": "0.2rem",
        "background-color": "var(--card-background)",
      }),
    menuList: () => ({
      padding: "0"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--color-primary-dark)"
    }),
    option: (provided) => ({
      ...provided,
      color: "var(--tab-text-color)",
      "background-color": "var(--card-background)",
      cursor: "pointer",
      "&:hover": {
        "background-color": "var(--color-blue-lighter)"
      }
    })
  }
  return (
    <div>
      <ReactSelect
        styles={customStyles}
        components={{ DropdownIndicator }}
        {...props}
      />
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  isSearchable: PropTypes.bool,
  width: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func
};

Select.defaultProps = {
  isSearchable: false,
};

export default React.memo(Select);
