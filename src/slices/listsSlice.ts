import { createSlice } from "@reduxjs/toolkit";

const savedLists = JSON.parse(localStorage.getItem("lists") || "[]");

const listsSlice = createSlice({

  name: "lists",
  initialState: {
    items: savedLists,
  },
  reducers: {
    addList: (state, action) => {
      const newItem = {
        id: Date.now(),
        ...action.payload,
      };

      state.items.push(newItem);
      localStorage.setItem("lists", JSON.stringify(state.items));
    },
  },
});

export const { addList } = listsSlice.actions;

export default listsSlice.reducer;