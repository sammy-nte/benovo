import { configureStore } from "@reduxjs/toolkit";
import menuReducer from './redux-features/menuSlice'


export const store = configureStore({
    reducer: {
        menu: menuReducer
    }
})