import { useCallback, useEffect } from "react";
import { SignIn } from "./pages/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Header, Loading, Menu, PrivateRoute } from "./components";
import { WalletsPage } from "./pages/Wallets";
import { CategoriesPage } from "./pages/Categories";
import { Toaster } from "react-hot-toast";
import {
  authSelector,
  completeAuthCheck,
  setAuthenticatedUser,
} from "@/concepts/Auth";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "./concepts/Account";
import { getAccount } from "./concepts/Account/repository/get";
import { useLoading } from "./providers";
import { getWalletsSnapshot } from "./concepts/Wallets";

const Home = () => {
  return <div>Autenticado</div>;
};

const App = () => {
  const { authCheckCompleted, user } = useSelector(authSelector);

  const { startLoading, stopLoading } = useLoading();

  const dispatch = useDispatch();

  const fetchExistingAccount = useCallback(
    async (docName: string) => {
      try {
        const account = await getAccount(docName);

        if (!account) {
          createAccount(user!);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [user]
  );

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      dispatch(setAuthenticatedUser(user));
      dispatch(completeAuthCheck());
      if (user && authCheckCompleted) {
        fetchExistingAccount(user.email!);
      }
    });

    return subscriber;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user && authCheckCompleted) {
      fetchExistingAccount(user.email!);
    }
  }, [authCheckCompleted, fetchExistingAccount, user]);

  useEffect(() => {
    if (user) {
      startLoading();

      const unsub = getWalletsSnapshot(user.uid, dispatch, stopLoading);

      return () => {
        unsub();
      };
    }
    // eslint-disable-next-line
  }, [user]);

  if (!authCheckCompleted) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-neutral-100 h-screen">
        <BrowserRouter>
          <Header
            menu={
              <Menu>
                <Link to="/wallets" className="text-white">
                  Carteiras
                </Link>
                <Link to="/categories" className="text-white">
                  Categorias
                </Link>
              </Menu>
            }
          />
          <div className="max-w-6xl m-auto py-9">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute isAuthenticated={!!user} outlet={<Home />} />
                }
              />
              <Route
                path="/wallets"
                element={
                  <PrivateRoute
                    isAuthenticated={!!user}
                    outlet={<WalletsPage />}
                  />
                }
              />
              <Route
                path="/categories"
                element={
                  <PrivateRoute
                    isAuthenticated={!!user}
                    outlet={<CategoriesPage />}
                  />
                }
              />
              <Route path="/login" element={<SignIn />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
      <Toaster position="top-right" reverseOrder />
    </>
  );
};

export default App;
