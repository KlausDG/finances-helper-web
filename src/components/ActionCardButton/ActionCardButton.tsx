export const ActionCardButton = ({
  children,
  onClick,
  disabled,
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="min-h-[210px] border-dashed border-2"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
