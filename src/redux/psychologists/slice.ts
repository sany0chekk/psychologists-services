import { createSlice } from "@reduxjs/toolkit";
import {
  addToFavorites,
  fetchFavorites,
  fetchPsychologists,
  removeFromFavorites,
} from "./operations";
import { Psychologist } from "../../types/psychologist";

interface State {
  psychologists: Psychologist[];
  favorites: Psychologist[];
  loading: boolean;
  error: string | null;
  lastKey?: string | null;
}

const initialState: State = {
  psychologists: [],
  favorites: [],
  loading: false,
  error: null,
  lastKey: null,
};

const slice = createSlice({
  name: "psychologists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPsychologists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        state.loading = false;
        state.psychologists = [
          ...state.psychologists,
          ...action.payload.result,
        ];
        state.lastKey = action.payload.lastKey;
      })
      .addCase(fetchPsychologists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToFavorites.pending, (state) => {
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(removeFromFavorites.pending, (state) => {
        state.error = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (fav) => Number(fav.id) !== Number(action.payload)
        );
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default slice.reducer;
