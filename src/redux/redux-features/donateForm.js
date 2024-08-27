import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    materialForm: [],
}

const formSlice = createSlice({
    name: "donateForm",
    initialState,
    reducers:{
        openMenu: (state, action) => {
            state.materialForm.push(action.payload)
        },
        closeMenu: (state) => {
            state.materialForm = []
        }
    }
})

export const {openMenu, closeMenu} = formSlice.actions

export default formSlice.reducer