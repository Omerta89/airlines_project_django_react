import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addFlightAsync } from "./flightSlice";
import { selectToken, } from "../user/loginSlice";

const AddFlight = () => {
    const dispatch = useDispatch();
    const myToken = useSelector(selectToken);
    const [airline_company, setairline_company] = useState("airlinetest");
    const [remaining_tickets, setremaining_tickets] = useState(100);
    const [destination_country, setdestination_country] = useState("spain");
    const [origin_country, setorigin_country] = useState("germany");
    const [departure_date, setdeparture_date] = useState("2022-08-25");
    const [departure_time, setdeparture_time] = useState("21:23:00");
    const [landing_time, setlanding_time] = useState("21:23:00");
    const [landing_date, setlanding_date] = useState("2022-08-26");
  
  return (
    <div>      
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
            departure_time: `${departure_date} ${departure_time}`, //fix time format is wrong
            landing_time: `${landing_date} ${landing_time}`, //fix time format is wrong
            remaining_tickets: remaining_tickets,
            destination_country: destination_country,
            airline_company: airline_company,
            origin_country: origin_country,
            mysentToken: myToken //change to local storage if empty
          },

          )
        )
      }
    >
      Add flight
    </button>
</div>
  )
}

export default AddFlight