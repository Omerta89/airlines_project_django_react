// eslint-disable-next-line no-unused-vars
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getTickets, addTicket, updTicket, deleteTicket, getTicketforCustomer } from "./ticketAPI";

const initialState = {
  tickets: [],
  nameconvert_airlineCountry: [],
};

export const getTicketsAsync = createAsyncThunk(
  "ticket/getTickets",
  async () => {
    const response = await getTickets();
    // console.log(response.data.nameconvert)
    return response.data;
  }
);

export const getTicketforCustomerAsync = createAsyncThunk(
  "ticket/getTicketforCustomer",
  async (info) => {
    // console.log(info.myToken)
    const response = await getTicketforCustomer(info);
    return response.data;
  }
);



export const addTicketAsync = createAsyncThunk(
  "ticket/addTicket",
  async (newTicket) => {
    const response = await addTicket(newTicket);
    return response.data;
  });

export const deleteTicketAsync = createAsyncThunk(
  "ticket/deleteTicket",
  async (myid_token) => {
    await deleteTicket(myid_token);
    return myid_token.ticket_id;
  }
);
export const updTicketAsync = createAsyncThunk(
  "ticket/updTicket",
  async (newTicket) => {
    const response = await updTicket(newTicket);
    return response.data
  }
);
export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketsAsync.fulfilled, (state, action) => {
        state.tickets = action.payload.main_seri;
        // console.log(action.payload.nameconvert)
        state.nameconvert_airlineCountry = action.payload.nameconvert;
      })
      .addCase(addTicketAsync.fulfilled, (state, action) => {
        state.tickets.push(action.payload);
        // console.log(action.payload)
      })
      .addCase(addTicketAsync.pending, (state, action) => {
        // console.log("pending");
        // console.log(action.payload)
      })
      .addCase(updTicketAsync.fulfilled, (state, action) => {
        let myupdTicket = state.tickets.find(
          (ticket) =>
            ticket._id === action.payload.id);
        // console.log(current(state.tickets))
        // console.log(action.payload.destination_country)
        myupdTicket.destination_country = action.payload.destination_country;
        myupdTicket.airline_company = action.payload.airline_company;
        myupdTicket.origin_country = action.payload.origin_country;
        // console.log(current(myupdTicket))
        myupdTicket.remaining_tickets = action.payload.remaining_tickets;
        myupdTicket.departure_time = action.payload.departure_time;
        myupdTicket.landing_time = action.payload.landing_time;
      })
      .addCase(deleteTicketAsync.fulfilled, (state, action) => {
        state.tickets = [];

      }).addCase(getTicketforCustomerAsync.fulfilled, (state, action) => {
        state.tickets = action.payload;
        console.log(action.payload)
      });
  },
});

// export const { } = ticketSlice.actions;
export const selectTickets = (state) => state.ticket.tickets;
export const selectnameconvert_airlineCountry = (state) => state.ticket.nameconvert_airlineCountry;
export default ticketSlice.reducer;