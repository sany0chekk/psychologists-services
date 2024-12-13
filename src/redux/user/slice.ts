import { createSlice } from "@reduxjs/toolkit";
import {
  checkAuthStatus,
  googleSignIn,
  login,
  logout,
  register,
} from "./operations";
import { UserState } from "../../types/user";

const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
  isAuthorized: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthorized = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthorized = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthorized = !!action.payload;
        state.isRefreshing = false;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addCase(googleSignIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthorized = true;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred";
        }
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.isRefreshing = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.isAuthorized = true;
        state.isRefreshing = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isRefreshing = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred";
        }
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isRefreshing = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.isAuthorized = true;
        state.isRefreshing = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isRefreshing = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred";
        }
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.isRefreshing = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthorized = false;
        state.isRefreshing = false;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isRefreshing = false;
        state.loading = false;

        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An error occurred";
        }
      });
  },
});

export const { setUser, clearUser } = slice.actions;
export default slice.reducer;
