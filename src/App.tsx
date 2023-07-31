import { useEffect, useState } from "react";
import { SignIn } from "./pages/SignIn";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./services/firebase";

function App() {
  const [user, setUser] = useState<User | null>(null);
  console.log(user);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, setUser);

    return subscriber;
  }, []);

  return <SignIn />;
}

export default App;
