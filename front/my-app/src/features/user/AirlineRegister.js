import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { selectToken, doAirlineRegisterAsync } from "./loginSlice";

const ProfileRegister = () => {
    const dispatch = useDispatch();
    const [airline_name, setairline_name] = useState("airline company")
    const [country_id, setcountry_id] = useState(1)
    const myToken = useSelector(selectToken);

    return (
        <div>
            <hr />   <h2> Airline Registeration </h2><hr />
            airline_name: <input onChange={(e) => setairline_name(e.target.value)} /><br />
            country_id: <input onChange={(e) => setcountry_id(e.target.value)} /><br />


            <button className="w3-button w3-block w3-dark-grey"
                onClick={() =>
                    dispatch(
                        doAirlineRegisterAsync({
                            airline_name,
                            country_id,
                            myToken
                        })
                    )
                }
            >
                Register as an Airline
            </button>
            <hr />
        </div>
    )
}

export default ProfileRegister