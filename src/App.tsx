import { useEffect, useState } from "react";
import { SignIn } from "./pages/SignIn";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./services/firebase";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loading, PrivateRoute } from "./components";

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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute isAuthenticated={!!user} outlet={<Home />} />}
        />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
