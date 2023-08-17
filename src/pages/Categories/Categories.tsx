import { useCategoryForm } from "@/concepts/Categories/providers";
import {
  CategoryRowItem,
  CreateCategoryModal,
  categoriesSelector,
  getCategoriesSnapshot,
  useDeleteCategory,
} from "@/concepts/Categories";
import { useEffect } from "react";
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
  IconButton,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-hot-toast";

export const CategoriesPage = () => {
  const { openModal } = useCategoryForm();
  const { handleDeleteCategory } = useDeleteCategory();

  const dispatch = useDispatch();
  const { startLoading, stopLoading } = useLoading();

  const { user } = useSelector(authSelector);
  const categories = useSelector(categoriesSelector);

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
            {categories.map((category) => {
              return (
                <CategoryRowItem category={category}>
                  <>
                    <IconButton
                      aria-label="Edit"
                      colorScheme="green"
                      size="sm"
                      icon={<FaEdit />}
                      onClick={() => toast.error("Não implementado")}
                    />
                    <IconButton
                      aria-label="Remove"
                      colorScheme="red"
                      size="sm"
                      icon={<FaTrash />}
                      onClick={() => handleDeleteCategory(category.id)}
                    />
                  </>
                </CategoryRowItem>
              );
            })}
          </List>
        </CardBody>
      </Card>

      <CreateCategoryModal />
    </div>
  );
};
