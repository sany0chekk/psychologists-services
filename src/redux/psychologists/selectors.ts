import { RootState } from "../store";

export const selectPsychologists = (state: RootState) =>
  state.psychologists.psychologists;

export const selectFavorites = (state: RootState) =>
  state.psychologists.favorites;

export const selectLastKey = (state: RootState) => state.psychologists.lastKey;

export const selectLoading = (state: RootState) => state.psychologists.loading;
