import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDatabase,
  ref,
  get,
  update,
  remove,
  query,
  limitToFirst,
  orderByKey,
  startAfter,
} from "firebase/database";
import toast from "react-hot-toast";
import { Psychologist } from "../../types/psychologist";

export const fetchPsychologists = createAsyncThunk(
  "psychologists/fetchPsychologists",
  async (lastKey: string | null = null, { rejectWithValue }) => {
    try {
      const db = getDatabase();
      const psychologistsRef = ref(db, "psychologists");
      let queryRef;

      if (lastKey) {
        queryRef = query(
          psychologistsRef,
          orderByKey(),
          startAfter(lastKey), // Завантажуємо після останнього ключа
          limitToFirst(3)
        );
      } else {
        queryRef = query(psychologistsRef, orderByKey(), limitToFirst(3));
      }

      const snapshot = await get(queryRef);
      const data = snapshot.val();

      if (data) {
        const result = (Object.entries(data) as [string, Psychologist][]).map(
          ([key, item]) => ({
            ...item,
            id: key,
          })
        );

        const lastKey = Object.keys(data).pop();
        const totalItemsSnapshot = await get(psychologistsRef);
        const totalItems = totalItemsSnapshot.val();
        const totalCount = totalItems ? Object.keys(totalItems).length : 0;

        if (Object.keys(data).length < 3 || Number(lastKey) + 1 >= totalCount) {
          return { result, lastKey: null };
        }

        return { result, lastKey };
      }

      return { result: [], lastKey: null };
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
      return psychologistId;
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
