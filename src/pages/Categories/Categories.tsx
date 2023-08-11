import { useCategoryForm } from "@/concepts/Categories/providers";
import {
  CategoryRowItem,
  CreateCategoryModal,
  categoriesSelector,
  getCategoriesSnapshot,
} from "@/concepts/Categories";
import { useEffect, useMemo } from "react";
import { useLoading } from "@/providers";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "@/concepts/Auth";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Button,
  List,
} from "@chakra-ui/react";
import { walletsSelector } from "@/concepts/Wallets";

export const CategoriesPage = () => {
  const { openModal } = useCategoryForm();

  const { startLoading, stopLoading } = useLoading();
  const dispatch = useDispatch();

  const { user } = useSelector(authSelector);
  const categories = useSelector(categoriesSelector);
  const wallets = useSelector(walletsSelector);

  const formattedCategories = useMemo(() => {
    return categories.map((category) => {
      return {
        ...category,
        wallet: wallets.find(({ id }) => id === category.walletId)?.name || "-",
      };
    });
  }, [categories, wallets]);

  useEffect(() => {
    startLoading();

    const unsub = getCategoriesSnapshot(user!.uid, dispatch, stopLoading);

    return () => {
      unsub();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Card className="w-[800px] m-auto">
        <CardHeader className="flex justify-between">
          <Heading size="md">Categorias</Heading>
          <Button colorScheme="green" onClick={openModal}>
            Nova Categoria
          </Button>
        </CardHeader>
        <CardBody>
          <List spacing={3}>
            {formattedCategories.map((category) => {
              return <CategoryRowItem category={category} />;
            })}
          </List>
        </CardBody>
      </Card>

      <CreateCategoryModal />
    </div>
  );
};
