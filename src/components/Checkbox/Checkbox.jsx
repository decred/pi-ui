import { PropTypes } from "prop-types";
import React from "react";
import { classNames } from "../../utils";
import styles from "./styles.module.css";
import Description from "../Description/Description.jsx";

const Checkbox = ({
  label,
  className,
  checked,
  style,
  name,
  id,
  description,
  ...props
}) => (
  <>
    <label htmlFor={id} className={classNames(styles.container, className)}>
      <input
        type="checkbox"
        checked={checked}
        id={id}
        name={name}
        style={style}
        {...props}
      />
      <span className={styles.checkmark} />
      <span>{label}</span>
    </label>
    <Description body={description} />
  </>
);

Checkbox.propTypes = {
  label: PropTypes.node,
  description: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  checked: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default Checkbox;
