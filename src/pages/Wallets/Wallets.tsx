import { ActionCardButton, Modal, Title } from "@/components";
import { useModal } from "@/hooks";
import { Button, Heading, Input } from "@chakra-ui/react";

export const WalletsPage = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <Title text="Carteiras" />
      <ActionCardButton onClick={openModal}>Nova Carteira</ActionCardButton>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Heading as="h4" size="md">
          Adicionar nova carteira
        </Heading>
        <section className="mt-8 w-80">
          <div className="flex flex-col px-4 gap-6">
            <div>
              <Title text="Nome da carteira" />
              <Input variant="flushed" size="sm" />
            </div>
            <div>
              <Title text="Porcentagem (40/100%)" />
              <Input variant="flushed" size="sm" />
            </div>
            <div className="mt-4 m-auto">
              <Button colorScheme="green">Adicionar</Button>
            </div>
          </div>
        </section>
      </Modal>
    </div>
  );
};
