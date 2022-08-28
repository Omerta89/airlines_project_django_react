import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFlights, getFlightsAsync, updFlightAsync, deleteFlightAsync } from "./flightSlice";
import { selectToken, selectIs_active, selectIs_staff, selectIs_superuser, selectlogin, selectUsername } from "../user/loginSlice";
import { addTicketAsync } from "../ticket/ticketSlice";
import "../../styles.css";

const Flights = () => {
  const myToken = useSelector(selectToken);
  const myFlights = useSelector(selectFlights);
  const loginStatus = useSelector(selectlogin);
  const userName = useSelector(selectUsername);
  // eslint-disable-next-line no-unused-vars
  const is_active = useSelector(selectIs_active);
  const is_staff = useSelector(selectIs_staff);
  const is_superuser = useSelector(selectIs_superuser);
  const dispatch = useDispatch();
  const [airline_company, setairline_company] = useState("aircompanytest");
  const [remaining_tickets, setremaining_tickets] = useState(55);
  const [destination_country, setdestination_country] = useState("spain");
  const [origin_country, setorigin_country] = useState("germany");
  const [departure_date, setdeparture_date] = useState("2022-08-25");
  const [departure_time, setdeparture_time] = useState("21:23:00");
  const [landing_time, setlanding_time] = useState("21:23:00");
  const [landing_date, setlanding_date] = useState("2022-08-26");
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState(""); // to be used
  // eslint-disable-next-line no-unused-vars
  const [searchCompany, setSearchCompany] = useState(""); // to be used
  useEffect(() => {
    dispatch(getFlightsAsync());
    // eslint-disable-next-line
  }, []);


  return (
    <div>
      <div style={{ backgroundColor: "cyan" }}>

        <h4>Flight Update Section</h4>
        <h5> {loginStatus ? `Hello ${userName}` : "Hello annoymous User"} </h5>


        {/* for update flight */}
        {is_superuser || is_staff ? <div>
          Airline Company (name must match existing airline_name): <input onChange={(e) => setairline_company(e.target.value)} /><hr />
          name of destination_country (must match db): <input onChange={(e) => setdestination_country(e.target.value)} /><hr />
          name of origin_country (must match existing country name in db): <input onChange={(e) => setorigin_country(e.target.value)} /><hr />
          remaining_tickets: <input onChange={(e) => setremaining_tickets(e.target.value)} /><hr />
          departure_date: <input type={"datetime-local"} onChange={(e) => setdeparture_date(e.target.valueAsDate)} />
          departure_time: <input type={"time"} onChange={(e) => setdeparture_time(e.target.value)} /><hr />
          landing_date: <input type={"datetime-local"} onChange={(e) => setlanding_date(e.target.valueAsDate)} />
          landing_time: <input type={"time"} onChange={(e) => setlanding_time(e.target.value)} />
        </div> : "Must be admin or airline company to UPDATE flights"}
      </div >


      {/* SEARCH */}
      <h1> ELALA - terminal </h1>
      Search : <input onChange={(e) => setSearch(e.target.value)} /> &nbsp;
      Search Airline Company : <input onChange={(e) => setSearchCompany(e.target.value)} />


      {/* fix filter, problem: include getting something else from array/string */}
      {/* {myFlights ? myFlights
        .filter(
          (x) =>
            x.destination_country.includes(search) && x.airline_company.includes(searchCompany)
        ) : "probably include gettin not array"} */}
      {/* breaking filter to do lion in the desert */}






      {/* DISPLAY FLIGHTS */}
      <div className="w3-container" style={{ "backgroundColor": "steelblue" }}>
        <h2>Flights</h2> number of flights: {myFlights.length}

        {myFlights.map((flight, i) => (
          <div className="w3-container" style={{ "backgroundColor": "steelblue" }} key={i} >
            <h3>airline_company:  {flight.airline_company}</h3>
            <div className="w3-card-4" style={{ "width": "70%" }} >
              <header className="w3-container w3-light-grey">
                <h3>Flight _id: {flight._id} </h3>
              </header>
              <div className="w3-container">
                <p>flight from: {flight.origin_country} {/* country is in number=need to get country name */}
                  to destination_country: {flight.destination_country}</p>
                <br />
                <img src="airplane.jpg" alt="airplane" className="w3-left w3-circle w3-margin-right photo " style={{ "display": "flex", "flexDirection": "row" }}  ></img>
                departure_time: {flight.departure_time} <br /> landing_time: {flight.landing_time}  <br />remaining_tickets: {flight.remaining_tickets} <br />

                {(is_superuser || is_staff) && <div>
                  <button className="w3-button w3-block w3-dark-grey"
                    onClick={() =>
                      dispatch(
                        updFlightAsync({
                          id: flight._id,
                          departure_time: `${departure_date} ${departure_time}`,
                          landing_time: `${landing_date} ${landing_time}`,
                          remaining_tickets: remaining_tickets,
                          destination_country: destination_country,
                          airline_company: airline_company,
                          origin_country: origin_country,
                          myToken: myToken
                        })
                      )
                    }
                  >
                    Update
                  </button>
                  <button className="w3-button w3-block w3-dark-grey"
                    onClick={() => dispatch(deleteFlightAsync({ flight_id: flight._id, myToken: myToken }))}>
                    Delete
                  </button>   </div>}

                {/*   BUY TICKET */}
                <button className="w3-button w3-block w3-dark-grey"
                  onClick={() => dispatch(addTicketAsync({ flight_id: flight._id, myToken: myToken }))}>
                  Buy Ticket
                </button>

                <hr />
              </div>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  );
};

export default Flights;
