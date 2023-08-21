export type CardHeaderContentProps = {
  currentDate: {
    month: string;
    year: number;
  };
  modal: {
    isOpen: boolean;
    open: () => void;
    close: () => void;
  };
};
