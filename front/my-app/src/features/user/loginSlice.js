import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { doLogin, doRegister, doCustomerRegister,getProfile,doAirlineRegister } from "./loginAPI";
import jwt_decode from "jwt-decode";

const initialState = {
  loginStatus: false,
  token: "",
  username: "",
  badCredMsg: false,
  is_staff: false,
  is_active: false,
  is_superuser: false,
  is_customer: false,
};

// call the methods in the API
export const doLoginAsync = createAsyncThunk(
  "login/doLogin",
  async (newlogin) => {
    const response = await doLogin(newlogin);
    // console.log(response)
    return response.data;
  }
);

// register
export const doRegisterAsync = createAsyncThunk(
  "login/doRegister",
  async (newRegister) => {
    const response = await doRegister(newRegister);
    // let crazytest = await useDispatch((doLoginAsync({ username: newRegister.username, pwd: newRegister.password })))
    current(console.log(newRegister.username))
    return response.data;
  }
);


// add Profile/ Customer register
export const doCustomerRegisterAsync = createAsyncThunk(
  "login/doCustomerRegister",
  async (newRegister) => {
    const response = await doCustomerRegister(newRegister);
    current(console.log(newRegister.address))
    return response.data;
  }
);

// get one profile
export const getProfileAsync = createAsyncThunk(
  "login/getProfile",
  async (credentials) => {
    const response = await getProfile(credentials);
    // console.log(response.data)
    return response.data;
  }
);

// add Airline register
export const doAirlineRegisterAsync = createAsyncThunk(
  "login/doAirlineRegister",
  async (newRegister) => {
    const response = await doAirlineRegister(newRegister);
    current(console.log(newRegister.country_id))
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
        state.is_staff = jwt_decode(myToken).is_staff;
        state.is_active = jwt_decode(myToken).is_active;
        state.is_superuser = jwt_decode(myToken).is_superuser;
        state.is_customer = jwt_decode(myToken).is_customer;
      }

    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.loginStatus = false;
      state.username = "";
      state.is_staff = false
      state.is_active = false
      state.is_superuser = false
      state.is_customer = false
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
        state.is_active = jwt_decode(state.token).is_active;
        state.is_superuser = jwt_decode(state.token).is_superuser;
        state.is_customer = jwt_decode(state.token).is_customer;
      }
    }).addCase(doLoginAsync.rejected, (state) => {
      state.badCredMsg = true;
      // let upon register to happen logic
    }).addCase(doRegisterAsync.fulfilled, (state, action) => {
      // console.log(action.payload)
    }).addCase(doCustomerRegisterAsync.fulfilled, (state, action) => {
      // console.log(state.is_customer)
    
      // for update
    // }).addCase(Async.fulfilled, (state, action) => {
      // console.log(state.is_customer)
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
export const selectIs_customer = (state) => state.login.is_customer;

export default loginSlice.reducer;
