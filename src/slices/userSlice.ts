import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: any) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    return userData;
  }
);





export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid credentials");
    }

    return foundUser;
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