import { Timestamp } from "firebase/firestore";
import { View, Text } from "@react-pdf/renderer";
import { formatFirebaseTimestampToBrazilianDate } from "@/utils";
import { formatCurrency } from "@brazilian-utils/brazilian-utils";
import { Report } from "../../../types";
import styles from "../PDF.styles";

export const Table = ({ report }: Report) => {
  const entriesTotalSum = report.entries.reduce((acc, entry) => {
    acc += entry.total;
    return acc;
  }, 0);

  return (
    <View style={styles.section}>
      <Text style={styles.section__header}>{report.category.name}</Text>
      {report.entries.map((entry, index) => (
        <View style={styles.row} key={index}>
          <Text style={styles.row__text}>
            {formatFirebaseTimestampToBrazilianDate(entry.date as Timestamp)}
          </Text>
          <Text style={styles.row__text}>{entry.description}</Text>
          <Text style={styles.row__text}>R$ {formatCurrency(entry.total)}</Text>
        </View>
      ))}
      <View style={styles.section__footer}>
        <Text>Total: {formatCurrency(entriesTotalSum)}</Text>
      </View>
    </View>
  );
};
