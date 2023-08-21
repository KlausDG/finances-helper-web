import { db } from "@/services/firebase";
import { getMonthPtBR, getYear } from "@/utils";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getCurrentSalaryKey } from "../../utils";

export const createSalary = async (
  salaryData: { amount: number },
  userId: string
) => {
  const salary = {
    ...salaryData,
    id: uuidv4(),
    createdAt: serverTimestamp(),
    userId,
    referenceMonth: getMonthPtBR(),
    referenceYear: getYear(),
  };

  const collectionRef = collection(db, "salaries");

  try {
    const documentRef = doc(collectionRef, getCurrentSalaryKey());
    await setDoc(documentRef, salary);
  } catch (error) {
    console.error(error);
  }
};
