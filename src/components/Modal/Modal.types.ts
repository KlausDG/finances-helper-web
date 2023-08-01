import { WithChildren } from "@/types";

export interface ModalProps extends WithChildren {
  isOpen: boolean;
  closeModal: () => void;
}
