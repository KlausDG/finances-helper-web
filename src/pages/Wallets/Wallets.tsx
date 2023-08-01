import { ActionCardButton, Modal, Title } from "@/components";
import { useModal } from "@/hooks";

export const WalletsPage = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <Title text="Carteiras" />
      <ActionCardButton onClick={openModal}>Nova Carteira</ActionCardButton>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        Teste
      </Modal>
    </div>
  );
};
