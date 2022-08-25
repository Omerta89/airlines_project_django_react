import React, { useState } from 'react'
import {  useSelector,useDispatch } from "react-redux";
import { selectToken,doCustomerRegisterAsync,selectIs_customer } from "./loginSlice";

const ProfileRegister = () => {
    const dispatch = useDispatch();
    const [address, setaddress] = useState("amnon street")
    const [credit_card, setcredit_card] = useState("45807676767")
    const [phone_num, setphone_num] = useState("0545676767")
    const myToken = useSelector(selectToken);
    const is_customer = useSelector(selectIs_customer);

    return (
        <div>
            <hr />   <h2> Customer Registeration </h2><hr />
            address: <input onChange={(e) => setaddress(e.target.value)} /><br />
            credit_card: <input type={'password'} onChange={(e) => setcredit_card(e.target.value)} /><br />
            phone_num: <input onChange={(e) => setphone_num(e.target.value)} /><br />


            <button className="w3-button w3-block w3-dark-grey"
                onClick={() =>
                    dispatch(
                        doCustomerRegisterAsync({
                            address,
                            credit_card,
                            phone_num,
                            myToken
                        })
                    )
                }
            >
                Register as a Customer
            </button>
<hr/>
{is_customer && "Registeration succesfull"}

        </div>
    )
}

export default ProfileRegister