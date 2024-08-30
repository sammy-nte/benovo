import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./redux-features/menuSlice";
import projectReducer from "./redux-features/projectSlice";
import modalDataReducer from "./redux-features/modalDataSlice";
import searchReducer from "./redux-features/searchSlice";
import ngoReducer from "./redux-features/ngoSlice";
import campaignReducer from "./redux-features/campaignEditSlice";
import formReducer from "./redux-features/donateForm";
import donorReducer from "./redux-features/donorDetailSlice";
import deactivateReducer from "./redux-features/deactivateSlice";

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    projects: projectReducer,
    modalData: modalDataReducer,
    search: searchReducer,
    ngo: ngoReducer,
    campaignEdit: campaignReducer,
    donateForm: formReducer,
    donorDetails: donorReducer,
    deactivate: deactivateReducer
  }
});
