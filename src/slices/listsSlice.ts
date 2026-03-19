import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4000/lists";

export const fetchLists = createAsyncThunk("lists/fetch", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});



export const addList = createAsyncThunk("lists/add", async (list: any) => {
  const res = await axios.post(API_URL, list);


  return res.data;
});

export const deleteList = createAsyncThunk("lists/delete", async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);


  return id;
});

export const updateList = createAsyncThunk("lists/update", async (list: any) => {
  const res = await axios.put(`${API_URL}/${list.id}`, list);
  return res.data;

});

const listsSlice = createSlice({
  name: "lists",
  initialState: { 
    items: [] as any[],
    search: "",
    sortKey: "" 
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
      
    },
    setSortKey: (state, action) => {
      state.sortKey = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchLists.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(addList.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(deleteList.fulfilled, (state, action) => {
      state.items = state.items.filter(list => list.id !== action.payload);
    });
    builder.addCase(updateList.fulfilled, (state, action) => {
      const index = state.items.findIndex(l => l.id === action.payload.id);
      if (index >= 0) state.items[index] = action.payload;
    });
  },
});

export const { setSearch, setSortKey } = listsSlice.actions;
export default listsSlice.reducer;