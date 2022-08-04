import { configureStore } from "@reduxjs/toolkit";
import flightSlice from '../features/flight/flightSlice';
import loginSlice from '../features/user/loginSlice';

export const store = configureStore({
  reducer: {
    flight: flightSlice,
    login : loginSlice,
  },
});
