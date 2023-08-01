import { useState } from "react";
import { ModalHookResult } from "./useModal.types";

export const useModal = (): ModalHookResult => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal };
};
