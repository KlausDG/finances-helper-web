import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "@/components";
import { AuthenticatedUser } from "@/concepts/Auth";
import { CategoryFormProvider } from "@/concepts/Categories/providers";
import { CategoriesPage } from "@/pages/Categories";
import { Home } from "@/pages/Home";
import { SignIn } from "@/pages/SignIn";
import { WalletsPage } from "@/pages/Wallets";

export const Router = ({ user }: { user: AuthenticatedUser | null }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<PrivateRoute isAuthenticated={!!user} outlet={<Home />} />}
      />
      <Route
        path="/wallets"
        element={
          <PrivateRoute isAuthenticated={!!user} outlet={<WalletsPage />} />
        }
      />
      <Route
        path="/categories"
        element={
          <PrivateRoute
            isAuthenticated={!!user}
            outlet={
              <CategoryFormProvider>
                <CategoriesPage />
              </CategoryFormProvider>
            }
          />
        }
      />
      <Route path="/login" element={<SignIn />} />
    </Routes>
  );
};
