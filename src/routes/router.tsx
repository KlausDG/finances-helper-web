import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "@/components";
import { CategoryFormProvider } from "@/concepts/Categories/providers";
import { CategoriesPage } from "@/pages/Categories";
import { Home } from "@/pages/Home";
import { SignIn } from "@/pages/SignIn";
import { WalletsPage } from "@/pages/Wallets";
import { JournalPage } from "@/pages/Journal";
import { CreateJournalEntryProvider } from "@/concepts/Journal/providers";
import { ReportsPage } from "@/pages/Reports";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute outlet={<Home />} />} />
      <Route
        path="/journal"
        element={
          <PrivateRoute
            outlet={
              <CreateJournalEntryProvider>
                <JournalPage />
              </CreateJournalEntryProvider>
            }
          />
        }
      />
      <Route
        path="/reports"
        element={<PrivateRoute outlet={<ReportsPage />} />}
      />
      <Route
        path="/wallets"
        element={<PrivateRoute outlet={<WalletsPage />} />}
      />

      <Route
        path="/categories"
        element={
          <PrivateRoute
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
