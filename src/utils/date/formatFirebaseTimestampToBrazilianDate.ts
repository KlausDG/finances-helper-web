import { Timestamp } from "firebase/firestore";

export const formatFirebaseTimestampToBrazilianDate = (
  timestamp: Timestamp
) => {
  const date = timestamp.toDate();

  const formattedDate = date.toLocaleDateString("pt-BR");
  return formattedDate;
};
