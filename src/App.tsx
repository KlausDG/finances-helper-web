import { useEffect } from "react";
import { SignIn } from "./pages/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Header, Loading, Menu, PrivateRoute } from "./components";
import { WalletsPage } from "./pages/Wallets";
import { Toaster } from "react-hot-toast";
import { useAuth } from "@/concepts/Auth";

const Home = () => {
  return <div>Autenticado</div>;
};

const App = () => {
  const {
    authenticatedUser,
    handleAuthenticatedUser,
    authCheckComplete,
    completeAuthCheck,
  } = useAuth();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      handleAuthenticatedUser(user);
      completeAuthCheck();
    });

    return subscriber;
    // eslint-disable-next-line
  }, []);

  if (!authCheckComplete) {
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
              </Menu>
            }
          />
          <div className="max-w-6xl m-auto py-9">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute
                    isAuthenticated={!!authenticatedUser}
                    outlet={<Home />}
                  />
                }
              />
              <Route
                path="/wallets"
                element={
                  <PrivateRoute
                    isAuthenticated={!!authenticatedUser}
                    outlet={<WalletsPage />}
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
