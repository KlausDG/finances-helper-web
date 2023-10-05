import { Page, Document } from "@react-pdf/renderer";
import { ReportData } from "../../types";

import styles from "./PDF.styles";
import { Table } from "./Table";

type PDFProps = {
  reportEntries: Array<ReportData>;
};

export const PDF = ({ reportEntries }: PDFProps) => {
  return (
    <Document>
      <Page style={styles.page}>
        {reportEntries.map((reportEntry, index) => {
          return <Table report={reportEntry} key={index} />;
        })}
      </Page>
    </Document>
  );
};
