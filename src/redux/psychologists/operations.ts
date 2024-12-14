import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, get, update, remove } from "firebase/database";
import toast from "react-hot-toast";
import { Psychologist } from "../../types/psychologist";

export const fetchPsychologists = createAsyncThunk(
  "psychologists/fetchPsychologists",
  async (_, { rejectWithValue }) => {
    const db = getDatabase();
    const psychologistsRef = ref(db, "psychologists");
    try {
      const snapshot = await get(psychologistsRef);
      if (snapshot.exists()) {
        const psychologists = snapshot.val();
        return Object.keys(psychologists).map((id) => ({
          ...psychologists[id],
          id,
        })) as Psychologist[];
      } else {
        return [];
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch psychologists";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId: string | undefined, { rejectWithValue }) => {
    const db = getDatabase();
    const userFavoritesRef = ref(db, `favorites/${userId}`);
    try {
      const snapshot = await get(userFavoritesRef);
      if (snapshot.exists()) {
        const favorites = snapshot.val();
        return Object.keys(favorites).map((id) => ({
          ...favorites[id],
          id,
        })) as Psychologist[];
      } else {
        return [];
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch favorites";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "favorites/addToFavorites",
  async (
    {
      userId,
      psychologist,
    }: { userId: string | undefined; psychologist: Psychologist },
    { rejectWithValue }
  ) => {
    const db = getDatabase();
    const userFavoritesRef = ref(db, `favorites/${userId}/${psychologist.id}`);
    try {
      await update(userFavoritesRef, { ...psychologist, id: psychologist.id });
      return psychologist;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to add to favorites";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "favorites/removeFromFavorites",
  async (
    {
      userId,
      psychologistId,
    }: { userId: string | undefined; psychologistId: string },
    { rejectWithValue }
  ) => {
    const db = getDatabase();
    const userFavoritesRef = ref(db, `favorites/${userId}/${psychologistId}`);
    try {
      await remove(userFavoritesRef);
      return psychologistId; // Повертаємо id для видалення
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to remove from favorites";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
