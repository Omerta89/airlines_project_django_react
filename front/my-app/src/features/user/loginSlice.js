import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doLogin } from "./loginAPI";
import jwt_decode from "jwt-decode";

const initialState = {
  loginStatus: false,
  token: "",
  username: "",
  badCredMsg:false
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
      console.log(action.payload.access);
      state.token = action.payload.access;
      localStorage.setItem("token", state.token);
      state.loginStatus = true;
      state.username = jwt_decode(state.token).username;
      state.badCredMsg = false;
    }).addCase(doLoginAsync.pending, (state) => {
      state.badCredMsg = true;
  });
  },
});

export const { checkLogin, logout } = loginSlice.actions;
export const selectlogin = (state) => state.login.loginStatus;
export const selectToken = (state) => state.login.token;
export const selectUsername = (state) => state.login.username;
export const selectBadCredMsg = (state) => state.login.badCredMsg;
export default loginSlice.reducer;
