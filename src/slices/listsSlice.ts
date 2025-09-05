import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export type Item = { id: number; name: string; qty: number; notes?: string; category?: string}
export type ShoppingList = {id: number; name: string; items: Item[]; createdAt: string }

interface listsState { lists: ShoppingList[]}

const initialState: listsState = { lists: []}

const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        setLists(state, action: PayloadAction<ShoppingList[]>) {
            state.lists = action.payload
        },
        addList(state, action: PayloadAction<ShoppingList>) {
            state.lists.unshift(action.payload)
        },
        updateList(state, action: PayloadAction<ShoppingList>) {
            state.lists = state.lists.map(l => (l.id === action.payload.id ? action.payload : l))
        },
        deleteList(state, action: PayloadAction<number>) {
            state.lists = state.lists.filter(l => l.id !== action.payload)
        },
    },
})

export const {setLists, addList, updateList, deleteList} = listsSlice.actions
export default listsSlice.reducer