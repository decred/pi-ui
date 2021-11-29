import PropTypes from "prop-types";
import React from "react";
import Icon from "../Icon/Icon.jsx";
import { classNames } from "../../utils";
import Spinner from "../Spinner/Spinner.jsx";
import styles from "./styles.css";
import {
  useTheme,
  getThemeProperty,
  DEFAULT_DARK_THEME_NAME,
} from "../../theme";

const ButtonIcon = ({
  type,
  className,
  style,
  disabled,
  onClick,
  loading,
  viewBox,
  ...props
}) => {
  const { theme, themeName } = useTheme();
  const iconColor = getThemeProperty(theme, "button-icon-color-1");
  const iconBgColor = getThemeProperty(theme, "button-icon-color-2");
  const isDarkTheme = themeName === DEFAULT_DARK_THEME_NAME;
  return (
    <button
      type="button"
      className={classNames(
        styles.buttonIcon,
        disabled && styles.disabled,
        loading && styles.loading,
        className
      )}
      style={style}
      disabled={disabled}
      onClick={onClick}
      {...props}>
      {loading ? (
        <Spinner invert={!isDarkTheme} width="1.4rem" height="1.4rem" />
      ) : (
        <Icon
          type={type}
          viewBox={viewBox}
          iconColor={iconColor}
          backgroundColor={iconBgColor}
        />
      )}
    </button>
  );
};

ButtonIcon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  viewBox: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

export default ButtonIcon;
