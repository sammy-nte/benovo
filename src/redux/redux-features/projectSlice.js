import { createSlice } from "@reduxjs/toolkit";
import { donationData } from "../../donationData";

const initialState = {
  projectData: []
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action) => {
      state.projectData = action.payload;
    }
  }
});

export const { addProject } = projectSlice.actions;

export default projectSlice.reducer;
