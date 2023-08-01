import { useEffect, useState } from "react";
import { SignIn } from "./pages/SignIn";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./services/firebase";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Header, Loading, Menu, PrivateRoute } from "./components";
import { WalletsPage } from "./pages/Wallets";
import { ChakraProvider } from "@chakra-ui/react";

const Home = () => {
  return <div>Autenticado</div>;
};

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthCheckComplete(true);
    });

    return subscriber;
  }, []);

  if (!authCheckComplete) {
    return <Loading />;
  }

  return (
    <ChakraProvider>
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
              <Route path="/login" element={<SignIn />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
};

export default App;
