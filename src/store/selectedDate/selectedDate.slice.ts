import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  month: new Date().toLocaleString("pt-BR", {
    month: "long",
  }),
  year: new Date().getFullYear(),
};

const selectedDateSlice = createSlice({
  name: "selectedDate",
  initialState,
  reducers: {
    setSelectedDate: (_, { payload }) => {
      return payload;
    },
  },
});

export const { setSelectedDate } = selectedDateSlice.actions;

export default selectedDateSlice.reducer;
