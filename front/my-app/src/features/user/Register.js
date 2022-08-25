import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import {  doRegisterAsync } from "./loginSlice";

const Register = () => {
    const dispatch = useDispatch();
    const [username, setusername] = useState("yuval admin test6")
    const [email, setemail] = useState("yuv@al.com")
    const [password, setpassword] = useState("12345678")
    const [is_staff, setis_staff] = useState(false)
    const [is_superuser, setis_superuser] = useState(false)

    return (
        <div>
            <hr />   <h2> Registeration </h2><hr />
            username: <input onChange={(e) => setusername(e.target.value)} /><br />
            email: <input type={'email'} onChange={(e) => setemail(e.target.value)} /><br />
            password: <input type={"password"} onChange={(e) => setpassword(e.target.value)} /><br />
            is_staff: <input type={"checkbox"} onChange={(e) => setis_staff(e.target.checked)} /><br />
            is_superuser: <input type={"checkbox"} onChange={(e) => setis_superuser(e.target.checked)} /><br />


            <button className="w3-button w3-block w3-dark-grey"
                onClick={() =>
                    dispatch(
                        doRegisterAsync({
                            username,
                            email,
                            password,
                            is_staff,
                            is_superuser
                        })
                    )
                }
            >
                Register
            </button>
        </div>
    )
}

export default Register