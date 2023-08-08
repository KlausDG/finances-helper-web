import { ActionCardButton, Modal, Title } from "@/components";
import { accountSelector } from "@/concepts/Account";
import { authSelector } from "@/concepts/Auth";
import {
  WalletCard,
  WalletsModal,
  useCreateWalletForm,
  useDeleteWallet,
  useUpdateWalletForm,
} from "@/concepts/Wallets";
import { getWalletsSnapshot } from "@/concepts/Wallets/repository/snapshot";
import { walletsSelector } from "@/concepts/Wallets/store";
import { useModal } from "@/hooks";
import { useLoading } from "@/providers";
import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const WalletsPage = () => {
  const {
    isOpen: isCreateOpen,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();
  const {
    isOpen: isEditOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();
  const { user } = useSelector(authSelector);
  const { totalPercentage } = useSelector(accountSelector);
  const wallets = useSelector(walletsSelector);
  const dispatch = useDispatch();

  const {
    currentAccountPercentage,
    handleWallet,
    handleNameInputChange,
    handlePercentageInputChange,
    wallet,
    resetWallet,
  } = useCreateWalletForm();

  const {
    editWallet,
    editedWalletValues,
    handleEditNameInputChange,
    handleEditPercentageInputChange,
    handleUpdateWallet,
  } = useUpdateWalletForm();

  const { handleDeleteWallet } = useDeleteWallet();

  const { startLoading, stopLoading, loading } = useLoading();

  const addWallet = () => {
    resetWallet();
    openCreateModal();
  };

  useEffect(() => {
    if (user) {
      startLoading();

      const unsub = getWalletsSnapshot(user.uid, dispatch, stopLoading);

      return () => {
        unsub();
      };
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <div>
      <Title text="Carteiras" />
      <div className="grid gap-4 grid-cols-2">
        {wallets.map((wallet, index) => (
          <WalletCard
            key={index}
            wallet={wallet}
            onEditClick={() => editWallet(wallet, openEditModal)}
            onRemoveClick={() => handleDeleteWallet(wallet)}
          />
        ))}
        <ActionCardButton
          onClick={addWallet}
          disabled={totalPercentage.value === 100}
        >
          Nova Carteira
        </ActionCardButton>
      </div>

      <Modal isOpen={isCreateOpen} closeModal={closeCreateModal}>
        <Heading as="h4" size="md">
          Adicionar nova carteira
        </Heading>
        <section className="mt-8 w-80">
          <WalletsModal
            currentAccountPercentage={currentAccountPercentage}
            onSubmit={() => handleWallet(closeCreateModal)}
            handleNameInputChange={handleNameInputChange}
            handlePercentageInputChange={handlePercentageInputChange}
            wallet={wallet}
            isLoading={loading}
          />
        </section>
      </Modal>

      <Modal isOpen={isEditOpen} closeModal={closeEditModal}>
        <Heading as="h4" size="md">
          Editar carteira
        </Heading>
        <section className="mt-8 w-80">
          <WalletsModal
            currentAccountPercentage={currentAccountPercentage}
            onSubmit={() => handleUpdateWallet(closeEditModal)}
            handleNameInputChange={handleEditNameInputChange}
            handlePercentageInputChange={handleEditPercentageInputChange}
            wallet={editedWalletValues}
            isLoading={loading}
          />
        </section>
      </Modal>
    </div>
  );
};
