import { useCategoryForm } from "../../providers";
import { ButtonSection } from "./ButtonSection";
import { ColorsSection } from "./ColorsSection";
import { IconPreview } from "./IconPreview";
import { IconsSection } from "./IconsSection";
import { NameSection } from "./NameSection";
import { TypeSection } from "./TypeSection";
import { WalletSection } from "./WalletSection";

export const CreateCategoryForm = () => {
  const {
    errors,
    handleSubmit,
    isLoading,
    register,
    setValue,
    wallets,
    watch,
  } = useCategoryForm();

  const watchColor = watch("color");
  const watchIcon = watch("icon");

  return (
    <div className="flex flex-col">
      {/* Icon preview and name form field */}
      <section className="flex gap-4 border-b px-1 py-6">
        <IconPreview color={watchColor} icon={watchIcon} />
        <NameSection register={register} error={errors.name?.message} />
      </section>

      {/* Type selection field */}
      <TypeSection register={register} />

      {/* Wallet selection field */}
      <WalletSection register={register} wallets={wallets} />

      {/* Color selection table */}
      <ColorsSection color={watchColor} selectColor={setValue} />

      {/* Icon selection table */}
      <IconsSection selectIcon={setValue} />
      <ButtonSection onClick={handleSubmit} isLoading={isLoading} />
    </div>
  );
};
