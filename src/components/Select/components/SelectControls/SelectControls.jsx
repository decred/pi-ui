import React from "react";
import PropTypes from "prop-types";
import Icon from "../../../Icon/Icon.jsx";
import { classNames } from "../../../../utils";
import styles from "./styles.css";

const SelectControls = ({
  clearable,
  cancelSelection,
  valueSelected,
  disabled,
  separator,
  menuOpened,
  error,
  showError
}) => (
  <div
    className={classNames(
      styles.controls,
      valueSelected && styles.valueSelected,
      disabled && styles.disabled,
      separator && styles.hasSeparator,
      clearable && styles.clearable,
      menuOpened && styles.menuOpened
    )}>
    {clearable && <div className={styles.clear} onClick={cancelSelection} />}
    {error && showError && (
      <Icon
        type="alert"
        backgroundColor="var(--color-orange)"
        iconColor="var(--color-orange--light)"
        className={classNames(styles.errorIcon, styles.errorIconActive)}
      />
    )}
    {separator && <span className={styles.separator} />}
    <div className={styles.arrowContainer}>
      <div className={styles.arrow} />
    </div>
  </div>
);

SelectControls.propTypes = {
  clearable: PropTypes.bool,
  cancelSelection: PropTypes.func,
  valueSelected: PropTypes.any,
  disabled: PropTypes.bool,
  separator: PropTypes.bool,
  menuOpened: PropTypes.bool,
  error: PropTypes.string,
  showError: PropTypes.bool
};

SelectControls.defaultProps = {
  clearable: false,
  cancelSelection: null,
  valueSelected: "",
  disabled: false,
  separator: false,
  menuOpened: false,
  error: "",
  showError: false
};

export default SelectControls;
