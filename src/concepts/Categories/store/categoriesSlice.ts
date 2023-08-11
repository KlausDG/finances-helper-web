import { createSlice } from "@reduxjs/toolkit";
import { CategoriesState } from "../types";

const initialState: CategoriesState = [];

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    setCategories: (_, { payload }) => {
      return payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
