import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType, InitialType } from "@/lib/definision";





const initialState: InitialType = {
    user: null,
    accessToken: null,
    isAuthenticate: false
}


const authSLice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{user:UserType, accessToken: string}>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticate = true;
        }
    }

})

export const {setUser} = authSLice.actions;
export default authSLice.reducer;