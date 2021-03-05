import React from "react";
import PropTypes from "prop-types";
import { classNames } from "../../../../utils";
import styles from "./styles.css";

const SelectFooter = ({ error, showError }) =>
  error &&
  showError && (
    <p className={classNames(styles.errorMsg, styles.errorMsgActive)}>
      {error}
    </p>
  );

SelectFooter.propTypes = {
  error: PropTypes.string,
  showError: PropTypes.bool
};

SelectFooter.defaultProps = {
  error: "",
  showError: false
};

export default SelectFooter;
