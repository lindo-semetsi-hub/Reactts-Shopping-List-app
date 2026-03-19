import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const API_URL = "http://localhost:4000/lists";

export const 
fetchLists = createAsyncThunk("lists/fetch", async () => {
  
    const res = await axios.get(API_URL);

  return res.data;
});

export const addList = createAsyncThunk("lists/add", async (list: any) => {
  const res = await axios.post(API_URL, list);
  return res.data;
});

const listsSlice = createSlice({
  name: "lists",

  initialState: { items: [] },
  reducers: {},
  extraReducers: builder => {
    
    builder.addCase(fetchLists.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(addList.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  }
});

export default listsSlice.reducer;