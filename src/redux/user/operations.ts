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
import toast from "react-hot-toast";

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
    }).catch((error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to check auth status";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    });
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
      const errorMessage =
        error instanceof Error ? error.message : "Google sign-in failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
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
      const errorMessage =
        error instanceof Error ? error.message : "Registration failed";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
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
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    await signOut(auth);
    return null;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Logout failed";
    toast.error(errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
