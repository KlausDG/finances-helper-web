import { Salary } from "../types";

export const salarySelector = (state: { salary: Salary }) => state.salary;
