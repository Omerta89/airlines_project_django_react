import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addCountryAsync } from "./countrySlice";
import { selectToken, } from "../user/loginSlice";

const AddCountry = () => {
  const dispatch = useDispatch();
  const myToken = useSelector(selectToken);
  const [country_name, setcountry_name] = useState("spain");


  return (
    <div>
      country_name: <input onChange={(e) => setcountry_name(e.target.value)} /><hr />
      <button
        onClick={() =>
          dispatch(
            addCountryAsync({
              country_name: country_name,
              mysentToken: myToken //change to local storage if empty
            },

            )
          )
        }
      >
        Add Country
      </button>
    </div>
  )
}

export default AddCountry