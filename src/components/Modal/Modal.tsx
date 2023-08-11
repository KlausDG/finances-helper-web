import ReactModal from "react-modal";
import type { ModalProps } from "./Modal.types";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    margin: "5% auto 0 auto",
    width: "fit-content",
    height: "fit-content",
    border: "1px solid #ccc",
    borderRadius: "4px",
    outline: "none",
    padding: "40px",
  },
};

export const Modal = ({ closeModal, isOpen, children }: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  );
};
