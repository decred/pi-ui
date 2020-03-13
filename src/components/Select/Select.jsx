import React from "react";
import ReactSelect, { components } from "react-select";
import PropTypes from "prop-types";
import { classNames } from "../../utils";
import "./styles.css";

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <div
          className={classNames(
            "arrowAnchor",
            props.selectProps.menuIsOpen && "open"
          )}
        />
      </components.DropdownIndicator>
    )
  );
};

DropdownIndicator.propTypes = {
  selectProps: PropTypes.object
};

const Select = (props) => {
  return (
    <ReactSelect
      classNamePrefix="customSelect"
      components={{ DropdownIndicator }}
      {...props}
    />
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  isSearchable: PropTypes.bool,
  value: PropTypes.object,
  onChange: PropTypes.func
};

Select.defaultProps = {
  isSearchable: false
};

export default React.memo(Select);
