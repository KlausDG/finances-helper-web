import { ActionCardButton, Modal, Title } from "@/components";
import { CreateWalletForm, WalletCard } from "@/concepts/Wallets";
import { useModal } from "@/hooks";
import { Heading } from "@chakra-ui/react";

export const WalletsPage = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <Title text="Carteiras" />
      <div className="grid gap-4 grid-cols-2">
        <WalletCard />
        <ActionCardButton onClick={openModal}>Nova Carteira</ActionCardButton>
      </div>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Heading as="h4" size="md">
          Adicionar nova carteira
        </Heading>
        <section className="mt-8 w-80">
          <CreateWalletForm closeModal={closeModal} />
        </section>
      </Modal>
    </div>
  );
};
