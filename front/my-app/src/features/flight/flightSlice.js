// eslint-disable-next-line no-unused-vars
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getFlights, addFlight, updFlight, deleteFlight } from "./flightAPI";

const initialState = {
  flights: [],
  nameconvert_airlineCountry: [],
};

export const getFlightsAsync = createAsyncThunk(
  "flight/getFlights",
  async () => {
    const response = await getFlights();
    // console.log(response.data.nameconvert)
    return response.data;
  }
);
export const addFlightAsync = createAsyncThunk(
  "flight/addFlight",
  async (newFlight) => {
    const response = await addFlight(newFlight);
    return response.data;
  });
export const deleteFlightAsync = createAsyncThunk(
  "flight/deleteFlight",
  async (myid_token) => {
    await deleteFlight(myid_token);
    return myid_token.flight_id;
  }
);
export const updFlightAsync = createAsyncThunk(
  "flight/updFlight",
  async (newFlight) => {
    const response = await updFlight(newFlight);
    return response.data
  }
);
export const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFlightsAsync.fulfilled, (state, action) => {
        state.flights = action.payload.main_seri;
        // console.log(action.payload.nameconvert)
        state.nameconvert_airlineCountry = action.payload.nameconvert;
      })
      .addCase(addFlightAsync.fulfilled, (state, action) => {
        state.flights.push(action.payload);
        // console.log(action.payload)
      })
      .addCase(addFlightAsync.pending, (state, action) => {
        // console.log("pending");
        // console.log(action.payload)
      })
      .addCase(updFlightAsync.fulfilled, (state, action) => {
        let myupdFlight = state.flights.find(
          (flight) =>
            flight._id === action.payload.id);
        // console.log(current(state.flights))
        // console.log(action.payload.destination_country)
        myupdFlight.destination_country = action.payload.destination_country;
        myupdFlight.airline_company = action.payload.airline_company;
        myupdFlight.origin_country = action.payload.origin_country;
        // console.log(current(myupdFlight))
        myupdFlight.remaining_tickets = action.payload.remaining_tickets;
        myupdFlight.departure_time = action.payload.departure_time;
        myupdFlight.landing_time = action.payload.landing_time;
      })
      .addCase(deleteFlightAsync.fulfilled, (state, action) => {
        state.flights = state.flights.filter(x => x._id !== action.payload);
      });
  },
});

// export const { } = flightSlice.actions;
export const selectFlights = (state) => state.flight.flights;
export const selectnameconvert_airlineCountry = (state) => state.flight.nameconvert_airlineCountry;
export default flightSlice.reducer;