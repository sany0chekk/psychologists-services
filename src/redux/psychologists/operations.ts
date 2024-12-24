import {createAsyncThunk} from "@reduxjs/toolkit";
import {get, getDatabase, ref, remove, update,} from "firebase/database";
import toast from "react-hot-toast";
import {Psychologist} from "../../types/psychologist";


interface FetchPsychologistsParams {
  page: number;
  pageSize: number;
  filter: "A to Z" | "Z to A" | "Less than 10$" | "Greater than 10$" | "Popular" | "Not popular" | "Show all";
}

export const fetchPsychologists = createAsyncThunk(
    "psychologists/fetchPsychologists",
    async ({ page, pageSize, filter }: FetchPsychologistsParams, { rejectWithValue }) => {
      try {
        const db = getDatabase();
        const snapshot = await get(ref(db, "psychologists"));

        if (!snapshot.exists()) {
          return { psychologists: [], hasMore: false };
        }

        let psychologists: Psychologist[] = Object.values(snapshot.val());

        switch (filter) {
          case "A to Z":
            psychologists.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "Z to A":
            psychologists.sort((a, b) => b.name.localeCompare(a.name));
            break;
          case "Less than 10$":
            psychologists = psychologists.filter((psych) => psych.price_per_hour < 10);
            break;
          case "Greater than 10$":
            psychologists = psychologists.filter((psych) => psych.price_per_hour > 10);
            break;
          case "Popular":
            psychologists.sort((a, b) => b.lessons_done - a.lessons_done);
            break;
          case "Not popular":
            psychologists.sort((a, b) => a.lessons_done - b.lessons_done);
            break;
          case "Show all":
          default:
            break;
        }

        const startIndex = (page - 1) * pageSize;
        const paginatedPsychologists = psychologists.slice(startIndex, startIndex + pageSize);

        const hasMore = startIndex + pageSize < psychologists.length;

        return { psychologists: paginatedPsychologists, hasMore };
      } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Failed to fetch psychologists";
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
