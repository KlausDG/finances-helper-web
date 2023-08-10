import * as allIcons from "react-icons/fa6";
import { availableColors, availableIconsFa } from "@/concepts/Categories";
import { IconType } from "react-icons";
import { ColorSelector, IconTemplate } from "@/concepts/Categories/components";
import { Circle, Modal, Title } from "@/components";
import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import { useModal } from "@/hooks";
import { useCategoryForm } from "@/concepts/Categories/hooks";

const CreateIcon = (iconName: string | undefined) => {
  const Icon = allIcons[iconName as keyof typeof allIcons];
  return <Icon color="white" size="32px" />;
};

export const CategoriesPage = () => {
  const { isOpen, openModal, closeModal } = useModal();

  const {
    errors,
    register,
    watch,
    setValue,
    getValues,
    handleCloseFormModal,
    handleSubmit,
    wallets,
  } = useCategoryForm({ closeModal });

  const watchColor = watch("color");
  const watchIcon = watch("icon");

  return (
    <div className="grid gap-4 grid-cols-6">
      <button onClick={openModal}>Nova Categoria</button>

      <Modal isOpen={isOpen} closeModal={handleCloseFormModal}>
        <Heading as="h4" size="md">
          Nova categoria
        </Heading>
        <section className="mt-4 w-[480px]">
          <div className="flex flex-col">
            {/* Icon preview and name form field */}
            <section className="flex gap-4 border-b px-1 py-6">
              <Circle
                size="lg"
                className={watchColor || "bg-gray-300"}
                selected={true}
              >
                {watchIcon && CreateIcon(getValues("icon"))}
              </Circle>
              <div className="flex flex-col flex-1 gap-1">
                <FormControl isRequired>
                  <FormLabel>Nome da categoria</FormLabel>
                  <Input {...register("name")} isRequired />
                  {errors.name?.message && (
                    <FormHelperText>{errors.name?.message}</FormHelperText>
                  )}
                </FormControl>
              </div>
            </section>

            {/* Type selection field */}
            <section className="flex flex-col gap-1 border-b px-1 py-6">
              <Title text="Tipo da categoria" />
              <Select {...register("type")}>
                <option value="expense">Despesa</option>
                <option value="income">Renda</option>
              </Select>
            </section>

            {/* Wallet selection field */}
            <section className="flex flex-col gap-1 border-b px-1 py-6">
              <Title text="Selecione uma carteira" />
              <Select {...register("walletId")} placeholder=" ">
                {wallets.map((wallet) => {
                  return (
                    <option value={wallet.id} key={wallet.id}>
                      {wallet.name} ({wallet.percentage}/100)
                    </option>
                  );
                })}
              </Select>
            </section>
            {/* Color selection table */}
            <section className="border-b py-6">
              <Title text="Escolha uma cor" />
              <div className="flex flex-wrap items-center justify-center mt-4">
                {availableColors.map((currentColor, index) => {
                  return (
                    <button
                      key={index}
                      className="p-1"
                      onClick={() => setValue("color", currentColor)}
                    >
                      <ColorSelector
                        color={currentColor}
                        selected={currentColor === watchColor}
                      />
                    </button>
                  );
                })}
              </div>
            </section>
            {/* Icon selection table */}
            <section className="py-6">
              <Title text="Escolha um ícone" />
              <div className="flex flex-wrap items-center justify-center mt-4 overflow-auto h-32 p-2 gap-2">
                {availableIconsFa.map((currentIcon, index) => {
                  const Icon: IconType =
                    allIcons[currentIcon as keyof typeof allIcons];

                  return (
                    <button
                      key={index}
                      className="p-1"
                      onClick={() => setValue("icon", currentIcon)}
                    >
                      <IconTemplate>
                        <Icon color="rgb(107 114 128)" size="20px" />
                      </IconTemplate>
                    </button>
                  );
                })}
              </div>
            </section>
            <div className="mt-4 m-auto">
              <Button
                colorScheme="green"
                onClick={handleSubmit}
                isLoading={false}
              >
                Criar Categoria
              </Button>
            </div>
          </div>
        </section>
      </Modal>
    </div>
  );
};
