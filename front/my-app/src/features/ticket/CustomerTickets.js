import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTickets, deleteTicketAsync, getTicketforCustomerAsync, selectFlightseri } from "./ticketSlice";
import { selectToken, selectlogin, selectUsername } from "../user/loginSlice";
import "../../styles.css";
import { selectFlights, getFlightsAsync } from "../flight/flightSlice";

const Tickets = () => {
  const myToken = useSelector(selectToken);
  const myFlights = useSelector(selectFlights);
  const myTickets = useSelector(selectTickets);
  const FlightOfTicket = useSelector(selectFlightseri);
  const loginStatus = useSelector(selectlogin);
  const userName = useSelector(selectUsername);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState(""); // to be used
  // eslint-disable-next-line no-unused-vars
  const [searchCompany, setSearchCompany] = useState(""); // to be used
  useEffect(() => {
    dispatch(getTicketforCustomerAsync({ myToken: myToken }));
    // eslint-disable-next-line
  }, []);

  let merge = (myTickets, FlightOfTicket) => ({...myTickets, ...FlightOfTicket});
  const a3 = myTickets.map(t1 => ({...t1, ...FlightOfTicket.find(t2 => t2.id === t1.id)}))

  return (
    <div>
      <div style={{ backgroundColor: "cyan" }}>
        <h4>Customer Section</h4>
        <h5> {loginStatus ? `Hello ${userName}` : "Hello annoymous User"} </h5>
      </div >

      <span class="material-icons-outlined">
settings
</span>

{typeof myTickets}


      {[
        ...myTickets,
        ...(FlightOfTicket ? FlightOfTicket : []),
      ].map((item, i) => (
        <div className="w3-container" style={{ "backgroundColor": "steelblue" }} key={i} >
          <div className="w3-card-4" style={{ "width": "70%" }} >
            <header className="w3-container w3-light-grey">

              customer_id:  {item.customer}<br />
              flight _id: {item.flight}<br />
              ticket _id: {item._id}<br />
              airline_company:  {item.airline_company}<br />
              flight from: {item.origin_country}<br />
              to destination_country: {item.destination_country}<br />

              departure_time: {item.departure_time} <br /> landing_time: {item.landing_time}  <br />remaining_tickets: {item.remaining_tickets} <br />
              <img src="airplane.jpg" alt="airplane" className="w3-left w3-circle w3-margin-right photo " style={{ "display": "flex", "flexDirection": "row" }}  ></img>

            </header>
          </div>
        </div>

      ))}


      {/* DISPLAY TicketS */}
      <h2>Tickets</h2>

      {/* {FlightOfTicket && myTickets.map((ticket, i) => (
        <div className="w3-container" style={{ "backgroundColor": "steelblue" }} key={i} >
          <div className="w3-card-4" style={{ "width": "70%" }} >
            <header className="w3-container w3-light-grey">
            <h3>customer_id:  {ticket.customer}</h3>
              <h3>flight _id: {ticket.flight} </h3>
              <h3>ticket _id: {ticket._id} </h3></header>
              <h3>airline_company:  {ticket.airline_company}</h3>

       
             
             </div></div>))}

             {FlightOfTicket && FlightOfTicket.map((flight, i) => (
        <div className="w3-container" style={{ "backgroundColor": "steelblue" }} key={i} >

            <h3>airline_company:  {flight.airline_company}</h3>
                <p>flight from: {flight.origin_country}
                  to destination_country: {flight.destination_country}</p>
                <br />
                <img src="airplane.jpg" alt="airplane" className="w3-left w3-circle w3-margin-right photo " style={{ "display": "flex", "flexDirection": "row" }}  ></img>
                departure_time: {flight.departure_time} <br /> landing_time: {flight.landing_time}  <br />remaining_tickets: {flight.remaining_tickets} <br />
                </div>))} */}


      <button className="w3-button w3-block w3-dark-grey"
        onClick={() => dispatch(deleteTicketAsync({ ticket_id: myTickets._id, myToken: myToken }))}>
        Delete
      </button>
      <br />
    </div>
  );
};

export default Tickets;
