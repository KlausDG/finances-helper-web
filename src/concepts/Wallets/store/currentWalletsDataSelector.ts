import { CurrentWalletsState } from "../types";

export const currentWalletsDataSelector = (state: {
  currentWalletsData: CurrentWalletsState;
}) => state.currentWalletsData;
