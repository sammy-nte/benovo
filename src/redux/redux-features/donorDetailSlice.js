import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    details: null
}

const donorSlice = createSlice({
    name: "donorDetail",
    initialState,
    reducers: {
        openDetails: (state, action) => {
            state.details = action.payload
        },
        closeDetails: (state) => {
            state.details = null
        }
    }
})

export const {openDetails, closeDetails} = donorSlice.actions
export default donorSlice.reducer