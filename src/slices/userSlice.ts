import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4000/users";

// --------------------------
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: any) => {
    const res = await axios.post(API_URL, userData);
    return res.data;
  }
);

//----------------------------------
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }) => {
    const res = await axios.get(`${API_URL}?email=${email}&password=${password}`);
    if (res.data.length === 0) throw new Error("Invalid credentials");
    return res.data[0];
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { currentUser: null as any },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});




export const { logout } = userSlice.actions;
export default userSlice.reducer;