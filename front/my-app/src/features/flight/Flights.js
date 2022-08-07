import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFlights, getFlightsAsync, addFlightAsync, updFlightAsync, deleteFlightAsync, } from "./flightSlice";
import { selectlogin, selectUsername } from "../user/loginSlice";
import { selectToken, } from "../user/loginSlice";
import "../../styles.css";

const Flights = () => {
  const myToken = useSelector(selectToken);
  const myFlights = useSelector(selectFlights);
  const loginStatus = useSelector(selectlogin);
  const userName = useSelector(selectUsername);
  const dispatch = useDispatch();
  const [airline_company, setairline_company] = useState("");
  const [remaining_tickets, setremaining_tickets] = useState(0);
  const [destination_country, setdestination_country] = useState("");
  const [origin_country, setorigin_country] = useState("");
  const [departure_date, setdeparture_date] = useState("");
  const [departure_time, setdeparture_time] = useState("");
  const [landing_time, setlanding_time] = useState("");
  const [landing_date, setlanding_date] = useState("");
  const [search, setSearch] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  useEffect(() => {
    dispatch(getFlightsAsync());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div style={{ backgroundColor: "cyan" }}>
        <h5>Admin Section</h5>
        <h6> {loginStatus ? `Hello ${userName}` : "Hello annoymous User"} </h6>
       {/* add flight (input, button) */}
        Airline Company (name must match existing airline_name): <input onChange={(e) => setairline_company(e.target.value)} /><hr />
        destination_country (must be country id, *later turn to name): <input onChange={(e) => setdestination_country(e.target.value)} /><hr />
        origin_country (must match existing country id in db, must be country id, *later turn to name): <input onChange={(e) => setorigin_country(e.target.value)} /><hr />
        remaining_tickets: <input onChange={(e) => setremaining_tickets(e.target.value)} /><hr />
        departure_date: <input type={"date"} onChange={(e) => setdeparture_date(e.target.value)} />
        departure_time: <input type={"time"} onChange={(e) => setdeparture_time(e.target.value)} /><hr />
        landing_date: <input type={"date"} onChange={(e) => setlanding_date(e.target.value)} />
        landing_time: <input type={"time"} onChange={(e) => setlanding_time(e.target.value)} />
        <button
          onClick={() =>
            dispatch(
              addFlightAsync({
                departure_time: `${departure_date} ${departure_time}`,
                landing_time: `${landing_date} ${landing_time}`,
                remaining_tickets: remaining_tickets,
                destination_country: destination_country,
                airline_company: airline_company,
                origin_country: origin_country,
                mysentToken: myToken
              },

              )
            )
          }
        >
          Add flight
        </button>
      </div>

            {/* end of add flight section */}

      <h1> ELALA - terminal </h1>
      Search : <input onChange={(e) => setSearch(e.target.value)} />
      searchCompany : <input onChange={(e) => setSearchCompany(e.target.value)} />
      {myFlights.length}


      {/* fix filter, problem: include getting something else from array/string */}
      {/* {myFlights ? myFlights
        .filter(
          (x) =>
            x.destination_country.includes(search) && x.airline_company.includes(searchCompany)
        ) */}
      {/* breaking filter to do lion in the desert */}
      <h2>Flights</h2>
      {myFlights.map((flight, i) => (
        <div key={i}>

          <div className="w3-container" style={{ "backgroundColor": "steelblue" }} >

            <h3>airline_company:  {flight.airline_company}</h3>

            <div className="w3-card-4" style={{ "width": "70%" }} >
              <header className="w3-container w3-light-grey">
                <h3>Flights _id: {flight._id} </h3>
              </header>
              <div className="w3-container">

                <p>flight from: {flight.origin_country} {/* country is in number=need to get country name */}
                  to destination_country: {flight.destination_country}
                </p>
                <hr />
                <img src="airplane.jpg" alt="airplane" className="w3-left w3-circle w3-margin-right photo " style={{ "display": "flex", "flexDirection": "row" }}  ></img>

                departure_time: {flight.departure_time} <hr /> landing_time: {flight.landing_time}  <hr />remaining_tickets: {flight.remaining_tickets} <br />





                <button className="w3-button w3-block w3-dark-grey"
                  onClick={() =>
                    dispatch(
                      updFlightAsync({
                        destination_country: destination_country,
                        airline_company: airline_company,
                        id: flight._id,
                      })
                    )
                  }
                >
                  Update
                </button>
                <button className="w3-button w3-block w3-dark-grey"
                  onClick={() => dispatch(deleteFlightAsync({ id: flight._id }))}>
                  Delete
                </button>
                <br />
              </div>
            </div>
          </div>

        </div>
      )) //: "there is no array yet, put loading button here"
      }
    </div>
  );
};

export default Flights;
