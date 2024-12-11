import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    isAuthorized: false,
  },
  reducers: {},
});

export default slice.reducer;
