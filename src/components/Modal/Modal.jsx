import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { classNames } from "../../utils";
import H1 from "../Typography/H1.jsx";
import Icon from "../Icon/Icon.jsx";
import ModalWrapper from "./ModalWrapper.jsx";
import styles from "./styles.css";
import useLockBodyScrollOnTrue from "../../hooks/useLockBodyScrollOnTrue";
import useKeyPress from "../../hooks/useKeyPress";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.appendChild(modalRoot);

// TODO: use svg icons when we have them
const Modal = ({
  style,
  wrapperStyle,
  className,
  wrapperClassName,
  contentClassName,
  contentStyle,
  children,
  show,
  onClose,
  title,
  titleStyle,
  iconType,
  iconSize,
  iconComponent,
  disableClose,
  ...props
}) => {
  const el = document.createElement("div");
  useEffect(() => {
    modalRoot.appendChild(el);
    return () => modalRoot.removeChild(el);
  });
  const onCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };
  const hasIcon = !!iconComponent || !!iconType;
  const iconSizeToUse = iconSize || "xlg";
  useLockBodyScrollOnTrue(show);
  const escPressed = useKeyPress("Escape");
  useEffect(() => {
    if (escPressed && show && !disableClose) {
      onClose();
    }
  }, [escPressed, show, disableClose, onClose]);
  return createPortal(
    <ModalWrapper
      show={show}
      style={wrapperStyle}
      onClose={onClose}
      disableClose={disableClose}
      className={classNames(wrapperClassName)}>
      <div
        className={classNames(
          show ? styles.modalVisible : styles.modal,
          className
        )}
        style={style}
        {...props}>
        {hasIcon && (
          <div
            className={classNames(styles.iconWrapper, styles[iconSizeToUse])}>
            {iconComponent || <Icon size={iconSizeToUse} type={iconType} />}
          </div>
        )}
        <div
          style={contentStyle}
          className={classNames(styles.modalContent, contentClassName)}>
          {title && (
            <H1 style={titleStyle} className={styles.modalTitle}>
              {title}
            </H1>
          )}
          {children}
        </div>
        {!disableClose && (
          <a
            className={styles.modalClose}
            onClick={onCloseClick}
            data-testid="close"
            href="#">
            &times;
          </a>
        )}
      </div>
    </ModalWrapper>,
    el
  );
};

Modal.propTypes = {
  wrapperStyle: PropTypes.object,
  contentClassName: PropTypes.string,
  contentStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  iconType: PropTypes.string,
  iconSize: PropTypes.string,
  iconComponent: PropTypes.node,
  disableClose: PropTypes.bool
};

Modal.defaultProps = {
  disableClose: false
};

export default Modal;
