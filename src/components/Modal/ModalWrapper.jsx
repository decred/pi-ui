import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import { classNames } from "../../utils";

const ModalWrapper = ({
  children,
  style,
  show,
  onClose,
  disableClose,
  className,
  ...props
}) => {
  const handleClickOverlay = (e) => {
    e.stopPropagation();
    if (!disableClose) {
      e.target.id === "modal-wrapper" && onClose();
    }
  };
  return (
    <div
      id="modal-wrapper"
      onClick={handleClickOverlay}
      className={classNames(
        show ? styles.modalWrapperVisible : styles.modalWrapper,
        className
      )}
      {...props}>
      {children}
    </div>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.element,
  style: PropTypes.object,
  show: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  disableClose: PropTypes.bool
};

export default ModalWrapper;
