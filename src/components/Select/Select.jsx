import React, { useState, useCallback } from "react";
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

const Select = ({ ...props }) => {
  const [selectWidth, setSelectWidth] = useState(0);
  const wrapperRef = useCallback((node) => {
    if (node !== null) {
      setSelectWidth(node.getBoundingClientRect().width);
    }
  }, []);
  const isMini = selectWidth < 100;
  return (
    <div ref={wrapperRef}>
      <ReactSelect
        classNamePrefix={isMini ? "miniCustomSelect" : "customSelect"}
        components={{ DropdownIndicator }}
        {...props}
      />
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  isSearchable: PropTypes.bool,
  value: PropTypes.object,
  onChange: PropTypes.func,
  mini: PropTypes.bool
};

Select.defaultProps = {
  isSearchable: false
};

export default React.memo(Select);
