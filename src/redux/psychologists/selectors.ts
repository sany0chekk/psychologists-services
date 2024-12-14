import { RootState } from "../store";

export const selectPsychologists = (state: RootState) =>
  state.psychologists.psychologists;

export const selectFavorites = (state: RootState) =>
  state.psychologists.favorites;
