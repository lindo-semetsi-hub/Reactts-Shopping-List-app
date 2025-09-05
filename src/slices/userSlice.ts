import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type User = {
    id?: number 
    email?: string
    name?: string
    surname?: string 
    cell?: string
}
interface UserState {
    current?: User | null
    token?: string | null
}
const initialState: UserState = {
    current: null,
    token: null,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<{user: User; token: string}>) {
            state.current = action.payload.user
            state.token = action.payload.token
        },  
        logout(state) {
            state.current = null
            state.token= null 
        },
        updateProfile(state, action: PayloadAction<User>) {
            state.current = { ...PayloadAction(state.current || {}), ...action.payload}
        },
    },
})

export const { loginSuccess, logout, updateProfile } = userSlice.actions
export default userSlice.reducer
