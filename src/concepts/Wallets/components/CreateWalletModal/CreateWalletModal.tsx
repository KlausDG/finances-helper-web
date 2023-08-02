import { Modal } from "@/components";
import { Heading } from "@chakra-ui/react";
import { CreateWalletForm } from "..";
import { CreateWalletModalProps } from "./CreateWalletModal.types";

export const CreateWalletModal = ({
  isOpen,
  closeModal,
}: CreateWalletModalProps) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Heading as="h4" size="md">
        Adicionar nova carteira
      </Heading>
      <section className="mt-8 w-80">
        <CreateWalletForm closeModal={closeModal} />
      </section>
    </Modal>
  );
};
