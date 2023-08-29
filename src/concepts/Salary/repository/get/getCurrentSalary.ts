import { db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getCurrentSalaryKey } from "../../utils";
import { salaryCollection } from "../collection";

export const getCurrentSalary = async () => {
  const salaryKey = getCurrentSalaryKey();

  const docRef = doc(db, salaryCollection, salaryKey);

  try {
    const docSnapshot = await getDoc(docRef);

    return docSnapshot.data();
  } catch (error) {
    console.log(error);
  }
};
