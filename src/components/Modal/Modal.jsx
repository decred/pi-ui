import React from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import ModalWrapper from "./ModalWrapper.jsx";
import styles from "./styles.css";
import H1 from "../Typography/H1.jsx";

const root = document.getElementById("root");

// TODO: use svg icons when we have them
// TODO: lock scroll on body when Modal is active
// TODO: close modal on ESC key press
const Modal = ({
  style,
  wrapperStyle,
  className,
  wrapperClassName,
  children,
  show,
  onClose,
  title,
  ...props
}) => {
  const onCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };
  return createPortal(
    <ModalWrapper
      show={show}
      style={wrapperStyle}
      onClose={onClose}
      className={wrapperClassName}>
      <div
        className={show ? styles.modalVisible : styles.modal}
        style={style}
        {...props}>
        {title && <H1 className={styles.modalTitle}>{title}</H1>}
        <a className={styles.modalClose} onClick={onCloseClick} href="#">
          &times;
        </a>
        {children}
      </div>
    </ModalWrapper>,
    root
  );
};

Modal.propTypes = {
  wrapperStyle: PropTypes.object,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string
};
Modal.defaultProps = {
  className: "",
  wrapperClassName: ""
};

export default Modal;
