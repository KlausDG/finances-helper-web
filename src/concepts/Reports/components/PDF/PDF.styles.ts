import { StyleSheet } from "@react-pdf/renderer";

export default StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  section: {
    marginBottom: 24,
    padding: 16,
    border: "1px solid black",
  },
  section__header: {
    fontSize: 24,
    fontWeight: "black",
    paddingBottom: 16,
  },
  section__footer: {
    borderTop: "1px solid black",
    marginTop: 8,
    paddingTop: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "left",
    paddingVertical: 4,
  },
  row__text: {
    fontSize: 12,
    minWidth: 200,
  },
});
