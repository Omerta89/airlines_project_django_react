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
  async (id) => {
    await deleteFlight(id.id);
    return id.id;
  }
);

// call the methods in the API
export const updFlightAsync = createAsyncThunk(
  "flight/updFlight",
  async (newFlight) => {
    let newBody = {
      destination: newFlight.destination,
      companyName: newFlight.companyName,
    };
    let id = newFlight.id;
    const response = await updFlight(newBody, id);
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
        console.log(action.payload);
        let updFlight = state.flights.find(
          (flight) => flight.id === action.payload.id);
        updFlight.destination = action.payload.destination;
        updFlight.companyName = action.payload.companyName;
      })
      .addCase(deleteFlightAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.flights = state.flights.filter(x => x.id !== action.payload);
      });
  },
});

// export const { } = flightSlice.actions;
export const selectFlights = (state) => state.flight.flights;
export default flightSlice.reducer;
