import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.css";
import { classNames } from "../../utils";

const ModalWrapper = ({
  children,
  style,
  show,
  onClose,
  className,
  ...props
}) => {
  const handleClickOverlay = (e) => {
    e.stopPropagation();
    e.target.id === "modal-wrapper" && onClose();
  };

  return (
    <div
      id="modal-wrapper"
      onClick={handleClickOverlay}
      className={classNames(
        show ? styles.modalWrapperVisible : styles.modalWrapper,
        className
      )}>
      {children}
    </div>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.element,
  style: PropTypes.object,
  show: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

export default ModalWrapper;
