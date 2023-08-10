import { Modal } from "@/components";
import { Heading } from "@chakra-ui/react";
import { useCategoryForm } from "../../providers";
import { CreateCategoryForm } from "../CreateCategoryForm/CreateCategoryForm";

export const CreateCategoryModal = () => {
  const { handleCloseFormModal, isOpen } = useCategoryForm();

  return (
    <Modal isOpen={isOpen} closeModal={handleCloseFormModal}>
      <Heading as="h4" size="md">
        Nova categoria
      </Heading>
      <section className="mt-4 w-[480px]">
        <CreateCategoryForm />
      </section>
    </Modal>
  );
};
