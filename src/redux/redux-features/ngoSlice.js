import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uid: null,
    email: null
}

const ngoSlice = createSlice({
    name: "ngo",
    initialState,
    reducers: {
        setUid: (state, action) => {
            state.uid = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        }
    }
})


export const {setUid, setEmail} = ngoSlice.actions

export default ngoSlice.reducer