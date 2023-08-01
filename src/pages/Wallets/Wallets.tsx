import { ActionCardButton, Modal, Title } from "@/components";
import { useModal } from "@/hooks";
import { db } from "@/services/firebase";
import { Button, Heading, Input } from "@chakra-ui/react";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export const WalletsPage = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const [walletName, setWalletName] = useState("");
  const [walletPercentage, setWalletPercentage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<unknown>(null);

  console.log(userData);

  const walletsCollectionRef = collection(db, "wallets");
  const userDataCollectionRef = collection(db, "user-data");

  const addWallet = async () => {
    const newWallet = {
      id: uuidv4(),
      name: walletName,
      percentage: walletPercentage,
    };

    try {
      const walletRef = doc(walletsCollectionRef, newWallet.id);
      await setDoc(walletRef, newWallet);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTotalUserPercentage = async () => {
    const userPercentage = {
      percentage: {
        value: userData
          ? Number(userData?.percentage?.value) + Number(walletPercentage)
          : Number(walletPercentage),
        lastUpdate: serverTimestamp(),
      },
    };

    try {
      const userDataRef = doc(userDataCollectionRef, userData?.id);
      updateDoc(userDataRef, userPercentage);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateWallet = async () => {
    setIsLoading(true);

    try {
      await addWallet();
      await updateTotalUserPercentage();
      toast.success("Carteira criada com sucesso!");
    } catch (error) {
      toast.error("Ops... something went wrong!");
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  useEffect(() => {
    const q = query(
      userDataCollectionRef,
      limit(1)
      //  where('owner', '==', currentUserId),
    );

    setIsLoading(true);
    // const unsub = onSnapshot(q, (querySnapshot) => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      setUserData(querySnapshot.docs[0]);
      setIsLoading(false);
    });
    return () => {
      unsub();
    };

    // eslint-disable-next-line
  }, []);

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
              <Input
                variant="flushed"
                size="sm"
                value={walletName}
                onChange={(event) => setWalletName(event.target.value)}
              />
            </div>
            <div>
              {/**
               * TODO:
               * - Move the available percentage text to the end of the line.
               * - Set the available percentage text based on the account percentage
               * - Add char limit based on the available account percentage.
               */}
              <Title text="Porcentagem (40/100%)" />
              <Input
                variant="flushed"
                size="sm"
                value={walletPercentage}
                onChange={(event) => setWalletPercentage(event.target.value)}
              />
            </div>
            <div className="mt-4 m-auto">
              <Button
                colorScheme="green"
                onClick={() => handleCreateWallet()}
                isLoading={isLoading}
              >
                Adicionar
              </Button>
            </div>
          </div>
        </section>
      </Modal>
    </div>
  );
};
