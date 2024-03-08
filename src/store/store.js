// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../store/authSlice";
import favouriteReducer from '../store/favouriteSlice';


export default configureStore({
  reducer: {
    auth: authReducer,
    favorites : favouriteReducer
  },
});
