import React, { ReactNode, useEffect } from "react";
import styles from "./styles.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onClick,
  children,
}) => {
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) onClick();
  };
  return (
    <div
      className={`${styles.modalContainer} ${isOpen && `${styles.modalOpen}`}`}
      onClick={onClose}
    >
      <div className="modalContent" onClick={handleModalClick}>
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
