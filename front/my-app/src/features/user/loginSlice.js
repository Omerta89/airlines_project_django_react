import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doLogin } from "./loginAPI";
import jwt_decode from "jwt-decode";

const initialState = {
  loginStatus: false,
  token: "",
  username: "",
  badCredMsg: false,
  is_staff: false,
  is_active: false,
  is_superuser: false,



};

// // call the methods in the API
export const doLoginAsync = createAsyncThunk(
  "login/doLogin",
  async (newlogin) => {
    const response = await doLogin(newlogin);
    return response.data;

  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    checkLogin: (state) => {
        let myToken = localStorage.getItem("token");
        if (myToken) {
          state.loginStatus = true;
          state.username = jwt_decode(myToken).username;
        }
      
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.loginStatus = false;
      state.username = "";

    },
  },
  extraReducers: (builder) => {
    builder.addCase(doLoginAsync.fulfilled, (state, action) => {
      if (action.payload.access) {
      state.token = action.payload.access;
      localStorage.setItem("token", state.token);
      state.loginStatus = true;
      state.username = jwt_decode(state.token).username;
      state.badCredMsg = false;
      state.is_staff = jwt_decode(state.token).is_staff;
      state.is_active= jwt_decode(state.token).is_active;
      state.is_superuser= jwt_decode(state.token).is_superuser;
    }}).addCase(doLoginAsync.pending, (state) => {
      state.badCredMsg = true;
    });
  },
});

export const { checkLogin, logout } = loginSlice.actions;
export const selectlogin = (state) => state.login.loginStatus;
export const selectToken = (state) => state.login.token;
export const selectUsername = (state) => state.login.username;
export const selectBadCredMsg = (state) => state.login.badCredMsg;
export const selectIs_staff = (state) => state.login.is_staff;
export const selectIs_active = (state) => state.login.is_active;
export const selectIs_superuser = (state) => state.login.is_superuser;

export default loginSlice.reducer;
