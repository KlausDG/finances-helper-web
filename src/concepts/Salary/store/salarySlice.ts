import { createSlice } from "@reduxjs/toolkit";
import { Salary } from "../types";
import { FieldValue } from "firebase/firestore";

const initialState: Salary = {
  salary: "",
  id: "",
  createdAt: {} as FieldValue,
  userId: "",
  referenceMonth: "",
  referenceYear: "",
};

const salarySlice = createSlice({
  name: "salary",
  initialState,
  reducers: {
    setSalary: (_, { payload }) => {
      return payload;
    },
  },
});

export const { setSalary } = salarySlice.actions;

export default salarySlice.reducer;
