import { Modal } from "@/components";
import { Heading } from "@chakra-ui/react";
import { CreateJournalEntryForm } from "..";
import { useCreateJournalEntry } from "../../providers";

export const CreateJournalEntryModal = () => {
  const { modal } = useCreateJournalEntry();

  return (
    <Modal isOpen={modal.isOpen} closeModal={modal.close}>
      <Heading as="h4" size="md">
        Nova despesa
      </Heading>
      <section className="mt-4 w-[480px]">
        <CreateJournalEntryForm />
      </section>
    </Modal>
  );
};
