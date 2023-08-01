import { useEffect, useState } from "react";
import { SignIn } from "./pages/SignIn";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./services/firebase";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Header, Loading, Menu, PrivateRoute } from "./components";
import { WalletsPage } from "./pages/Wallets";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return <div>Autenticado</div>;
};

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  console.log(user);

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
      <Toaster position="top-right" reverseOrder />
    </>
  );
};

export default App;
