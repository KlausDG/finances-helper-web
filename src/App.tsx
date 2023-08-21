import { useCallback, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import { BrowserRouter } from "react-router-dom";
import { Header, Loading, Menu } from "./components";
import { Toaster } from "react-hot-toast";
import {
  authSelector,
  completeAuthCheck,
  setAuthenticatedUser,
} from "@/concepts/Auth";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "./concepts/Account";
import { getAccount } from "./concepts/Account/repository/get";
import { getWalletsSnapshot } from "./concepts/Wallets";
import { Router } from "./routes";
import { getCategoriesSnapshot } from "./concepts/Categories";
import { useLoading } from "./providers";
import { getJournalEntriesSnapshot } from "./concepts/Journal";
import { useDate } from "./hooks";
import { getSalarySnapshot } from "./concepts/Salary/repository";
import { getMonthPtBR, getYear } from "./utils";

const App = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const { currentDate } = useDate();
  const { authCheckCompleted, user } = useSelector(authSelector);

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
      const unsub = getWalletsSnapshot(user.uid, dispatch);

      return () => {
        unsub();
      };
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (user) {
      startLoading();

      const unsub = getCategoriesSnapshot(user.uid, dispatch, stopLoading);

      return () => {
        unsub();
      };
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (user) {
      startLoading();

      const unsub = getJournalEntriesSnapshot(
        user.uid,
        currentDate,
        dispatch,
        stopLoading
      );

      return () => {
        unsub();
      };
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (user) {
      startLoading();

      const unsub = getSalarySnapshot(
        user.uid,
        getMonthPtBR(),
        getYear(),
        dispatch,
        stopLoading
      );

      return () => {
        unsub();
      };
    }
    // eslint-disable-next-line
  }, [user]);

  if (!authCheckCompleted || loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-neutral-100 h-screen">
        <BrowserRouter>
          <Header menu={<Menu />} />
          <div className="max-w-6xl m-auto py-9">
            <Router user={user} />
          </div>
        </BrowserRouter>
      </div>
      <Toaster position="top-right" reverseOrder />
    </>
  );
};

export default App;
