import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFlights, addFlight, updFlight, deleteFlight } from "./flightAPI";

const initialState = {
  flights: [],
};

// call the methods in the API
export const getFlightsAsync = createAsyncThunk(
  "flight/getFlights",
  async () => {
    const response = await getFlights();
    return response.data;
  }
);

// call the methods in the API
export const addFlightAsync = createAsyncThunk(
  "flight/addFlight",
  async (newFlight) => {
    const response = await addFlight(newFlight);

    return response.data;
  }
);
// call the methods in the API
export const deleteFlightAsync = createAsyncThunk(
  "flight/deleteFlight",
  async (myid_token) => {
    await deleteFlight(myid_token);
    return myid_token.flight_id;
  }
);

// call the methods in the API
export const updFlightAsync = createAsyncThunk(
  "flight/updFlight",
  async (newFlight) => {
    let newBody = {
      destination_country: newFlight.destination_country,
      origin_country: newFlight.origin_country,
      airline_company: newFlight.airline_company,
      remaining_tickets: newFlight.remaining_tickets,
      departure_time: newFlight.departure_time,
      landing_time: newFlight.landing_time,
    };
    let id = newFlight.id;
    let myToken = newFlight.myToken;
    const response = await updFlight(newBody, id, myToken);
    return response.data;
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
        state.flights = action.payload;
      })
      .addCase(addFlightAsync.fulfilled, (state, action) => {
        state.flights.push(action.payload);
        console.log(action.payload)
      })
      .addCase(addFlightAsync.pending, (state, action) => {
        console.log("rejected");
        console.log(action.payload)
      })
      .addCase(updFlightAsync.fulfilled, (state, action) => {
        console.log(state.flights);
        // console.log(action.payload.id)
        let updFlight = state.flights.find(
          (flight) =>
            flight.id === action.payload.id);
        // console.log(updFlight)
        updFlight.destination_country = action.payload.destination_country;
        updFlight.airline_company = action.payload.airline_company;
        updFlight.origin_country = action.payload.origin_country;
        updFlight.remaining_tickets = action.payload.remaining_tickets;
        updFlight.departure_time = action.payload.departure_time;
        updFlight.landing_time = action.payload.landing_time;
      })
      .addCase(deleteFlightAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.flights = state.flights.filter(x => x._id !== action.payload);
      });

  },
});


// export const { } = flightSlice.actions;
export const selectFlights = (state) => state.flight.flights;
export default flightSlice.reducer;
