import { useCallback, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "@/services/firebase";
import { Header, Loading, Menu } from "@/components";
import {
  authSelector,
  completeAuthCheck,
  setAuthenticatedUser,
} from "@/concepts/Auth";
import { createAccount, getAccount } from "@/concepts/Account";
import { getWalletsSnapshot } from "@/concepts/Wallets";
import { getCategoriesSnapshot } from "@/concepts/Categories";
import { getJournalEntriesSnapshot } from "@/concepts/Journal";
import { getSalarySnapshot } from "@/concepts/Salary";
import { Router } from "@/routes";
import { useLoading } from "@/providers";
import { getMonthPtBR, getYear } from "@/utils";
import { selectedDateSelector } from "./store/selectedDate";

const App = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const { authCheckCompleted, user } = useSelector(authSelector);
  const selectedDate = useSelector(selectedDateSelector);

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
        selectedDate,
        dispatch,
        stopLoading
      );

      return () => {
        unsub();
      };
    }
    // eslint-disable-next-line
  }, [user, selectedDate]);

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
