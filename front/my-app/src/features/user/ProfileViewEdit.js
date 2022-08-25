import React from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCountrys, getCountrysAsync } from "./countrySlice";
import { selectlogin, selectUsername } from "./loginSlice";
import "../../styles.css";

const Countrys = () => {
  const myCountrys = useSelector(selectCountrys);
  const loginStatus = useSelector(selectlogin);
  const userName = useSelector(selectUsername);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountrysAsync());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div style={{ backgroundColor: "cyan" }}>
        <h4>Admin Section</h4>
        <h5> {loginStatus ? `Hello ${userName}` : "Hello annoymous User"} </h5>
      </div >

      {/* DISPLAY CountryS */}
      <div className="w3-container" style={{ "backgroundColor": "steelblue" }}>
        <h2>Countries</h2> number of Countries: {myCountrys.length}
        {myCountrys && myCountrys.map((country, i) => (
          <div className="w3-container" style={{ "backgroundColor": "steelblue" }} key={i} >
            <hr />
            <h3>country name:  {country.country_name}</h3>
            <div className="w3-card-4" style={{ "width": "70%" }} >
              <header className="w3-container w3-light-grey">
                <h3>country id: {country._id} </h3>
              </header>
              <div className="w3-container">
                <img src="randomCountry.jpg" alt="country" className="w3-left w3-circle w3-margin-right photo " style={{ "display": "flex", "flexDirection": "row" }}  ></img>
                <br />
              </div>
            </div>
          </div>

        ))
        }
      </div>
    </div>
  );
};

export default Countrys;
