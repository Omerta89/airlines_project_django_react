// eslint-disable-next-line no-unused-vars
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
// eslint-disable-next-line no-unused-vars
import { getCountrys, addCountry, updCountry, deleteCountry } from "./countryAPI";

const initialState = {
  countrys: [],
};

export const getCountrysAsync = createAsyncThunk(
  "country/getCountrys",
  async () => {
    const response = await getCountrys();
    return response.data;
  }
);

export const addCountryAsync = createAsyncThunk(
  "country/addCountry",
  async (newCountry) => {
    const response = await addCountry(newCountry);
    return response.data;
  });

// export const deleteCountryAsync = createAsyncThunk(
//   "Country/deleteCountry",
//   async (myid_token) => {
//     await deleteCountry(myid_token);
//     return myid_token.Country_id;
//   }
// );

// export const updCountryAsync = createAsyncThunk(
//   "Country/updCountry",
//   async (newCountry) => {
//     const response = await updCountry(newCountry);
//     return response.data
//   }
// );

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountrysAsync.fulfilled, (state, action) => {
        state.countrys = action.payload;
      })
      .addCase(addCountryAsync.fulfilled, (state, action) => {
        state.countrys.push(action.payload);
        // console.log(action.payload)
      })
      .addCase(addCountryAsync.pending, (state, action) => {
        // console.log("pending");
        // console.log(action.payload)
      })
//       .addCase(updCountryAsync.fulfilled, (state, action) => {
//         let myupdCountry = state.countrys.find(
//           (country) =>
//             country._id === action.payload.id);
//         // console.log(current(state.countrys))
//         // console.log(action.payload.destination_country)
//         myupdCountry.destination_country = action.payload.destination_country;
//         myupdCountry.airline_company = action.payload.airline_company;
//         myupdCountry.origin_country = action.payload.origin_country;
//         // console.log(current(myupdCountry))
//         myupdCountry.remaining_tickets = action.payload.remaining_tickets;
//         myupdCountry.departure_time = action.payload.departure_time;
//         myupdCountry.landing_time = action.payload.landing_time;
//       })
//       .addCase(deleteCountryAsync.fulfilled, (state, action) => {
//         state.countrys = state.countrys.filter(x => x._id !== action.payload);
//       });
  },
});

// export const { } = countrySlice.actions;
export const selectCountrys = (state) => state.country.countrys;
export default countrySlice.reducer;