import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTickets, deleteTicketAsync, getTicketforCustomerAsync } from "./ticketSlice";
import { selectToken, selectlogin, selectUsername } from "../user/loginSlice";
import "../../styles.css";
import { selectFlights, getFlightsAsync} from "../flight/flightSlice";

const Tickets = () => {
  const myToken = useSelector(selectToken);
  const myFlights = useSelector(selectFlights);
  const myTickets = useSelector(selectTickets);
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

  return (
    <div>
      <div style={{ backgroundColor: "cyan" }}>
        <h4>Customer Section</h4>
        <h5> {loginStatus ? `Hello ${userName}` : "Hello annoymous User"} </h5>
      </div >




{/* flight */}
{myFlights.map((flight, i) => (flight._id))}


      {/* DISPLAY TicketS */}
      <div className="w3-container" style={{ "backgroundColor": "steelblue" }}>
        <h2>Tickets</h2>

        <div className="w3-container" style={{ "backgroundColor": "steelblue" }} >
          <h3>customer_id:  {myTickets && myTickets.customer}</h3>
          <div className="w3-card-4" style={{ "width": "70%" }} >
            <header className="w3-container w3-light-grey">
              <h3>flight _id: {myTickets && myTickets.flight} </h3>
              <h3>ticket _id: {myTickets && myTickets._id} </h3>
            </header>
            <div className="w3-container">


              <p>flight from: {myTickets.origin_country}
                to destination_country: {myTickets.destination_country}</p>
              <hr />
              <img src="airplane.jpg" alt="airplane" className="w3-left w3-circle w3-margin-right photo " style={{ "display": "flex", "flexDirection": "row" }}  ></img>
              departure_time: {myTickets.departure_time} <hr /> landing_time: {myTickets.landing_time}  <hr /> <br />
              <button className="w3-button w3-block w3-dark-grey"
                onClick={() => dispatch(deleteTicketAsync({ ticket_id: myTickets._id, myToken: myToken }))}>
                Delete
              </button>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
