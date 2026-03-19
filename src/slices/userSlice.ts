import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4000/users";

export const registerUser = createAsyncThunk(
  "user/register",
  async (user: any) => {
    const res = await axios.post(API_URL, user);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { currentUser: null, users: [] },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
      state.currentUser = action.payload;
    });
  }
});

export default userSlice.reducer;