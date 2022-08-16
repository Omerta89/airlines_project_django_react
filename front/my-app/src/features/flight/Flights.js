import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFlights, getFlightsAsync, addFlightAsync, updFlightAsync, deleteFlightAsync, selectnameconvert_airlineCountry } from "./flightSlice";
import { selectIs_active, selectIs_staff, selectIs_superuser, selectlogin, selectUsername } from "../user/loginSlice";
import { selectToken, } from "../user/loginSlice";
import "../../styles.css";

const Flights = () => {
  const myToken = useSelector(selectToken);
  const myFlights = useSelector(selectFlights);
  const loginStatus = useSelector(selectlogin);
  const userName = useSelector(selectUsername);
  const nameConvert = useSelector(selectnameconvert_airlineCountry);
  const is_active = useSelector(selectIs_active); // to be used
  const is_staff = useSelector(selectIs_staff); // to be used
  const is_superuser = useSelector(selectIs_superuser); // to be used
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
  // mapping flights and merging on id with nameConvert map. this to convert id to name. (because the two data was on two different models in back)
  let names_map = nameConvert ? nameConvert.map((name) => {
    return { "_id": name._id, "airline_company": name.airline_company, "origin_country": name.origin_country, "destination_country": name.destination_country };
  }) : console.log("something is wrong with names_map")
  let flights_map = myFlights ? myFlights.map((flight) => {
    return { "_id": flight._id, "airline_company": flight.airline_company, "remaining_tickets": flight.remaining_tickets, "landing_time": flight.landing_time, "departure_time": flight.departure_time, "origin_country": flight.origin_country, "destination_country": flight.destination_country };
  }) : console.log("something is wrong with flights_map")
  const merged_map_name = flights_map.map(t1 => ({ ...t1, ...names_map.find(t2 => t2._id === t1._id) }))


  return (
    <div>
      <div style={{ backgroundColor: "cyan" }}>
        <h4>Admin Section</h4>
        <h5> {loginStatus ? `Hello ${userName}` : "Hello annoymous User"} </h5>
        <h6> {loginStatus && `This user is active: ${is_active}, is staff: ${is_staff}, is superuser: ${is_superuser}`} </h6>

        {/* add flight (input, button) */}
        Airline Company (name must match existing airline_name): <input onChange={(e) => setairline_company(e.target.value)} /><hr />
        name of destination_country (must match db): <input onChange={(e) => setdestination_country(e.target.value)} /><hr />
        name of origin_country (must match existing country name in db): <input onChange={(e) => setorigin_country(e.target.value)} /><hr />
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
      Search : <input onChange={(e) => setSearch(e.target.value)} /> &nbsp;
      Search Airline Company : <input onChange={(e) => setSearchCompany(e.target.value)} />


      {/* fix filter, problem: include getting something else from array/string */}
      {/* {myFlights ? myFlights
        .filter(
          (x) =>
            x.destination_country.includes(search) && x.airline_company.includes(searchCompany)
        ) */}
      {/* breaking filter to do lion in the desert */}
      <h2>Flights</h2>
      number of flights: {myFlights.length}

      {merged_map_name.map((flight, i) => (
        <div key={i}>

          <div className="w3-container" style={{ "backgroundColor": "steelblue" }} >

            <h3>airline_company:  {flight.airline_company}</h3>

            <div className="w3-card-4" style={{ "width": "70%" }} >
              <header className="w3-container w3-light-grey">
                <h3>Flight _id: {flight._id} </h3>
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
