import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "../../../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  User,
} from "firebase/auth";

export const checkAuthStatus = createAsyncThunk(
  "user/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<User | null>((resolve, _reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
        unsubscribe();
      });
    }).catch((error) => rejectWithValue(error.message));
  }
);

export const googleSignIn = createAsyncThunk(
  "user/googleSignIn",
  async (_, { rejectWithValue }) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        return {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        };
      }
      return rejectWithValue("User not found");
    } catch (error) {
      console.error("Google sign-in error:", error);
      return rejectWithValue("Google sign-in failed");
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (
    {
      email,
      password,
      name,
    }: { email: string; password: string; name: string },
    thunkAPI
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      return {
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
      };
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return {
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
      };
    } catch (error) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
    return null;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    } else {
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
});
