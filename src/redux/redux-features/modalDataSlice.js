import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalData: null
};

const modalDataSlice = createSlice({
  name: "modalData",
  initialState,
  reducers: {
    setModalData: (state, action) => {
      state.modalData = action.payload;
    }
  }
});

export const {setModalData} = modalDataSlice.actions
export default modalDataSlice.reducer
