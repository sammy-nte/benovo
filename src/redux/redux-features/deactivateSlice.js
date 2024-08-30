import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Dedetails: null
};

const deactivateSlice = createSlice({
  name: "deactivate",
  initialState,
  reducers: {
    setDetails: (state, action) => {
      state.Dedetails = action.payload;
    },
    closeModal: state => {
      state.Dedetails = null;
    }
  }
});

export const { setDetails, closeModal } = deactivateSlice.actions;
export default deactivateSlice.reducer;
