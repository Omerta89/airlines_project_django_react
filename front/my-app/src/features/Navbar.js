import React from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectlogin, logout, selectIs_staff, selectIs_superuser, selectIs_customer } from "./user/loginSlice";

const Navbar = () => {
    const loginStatus = useSelector(selectlogin);
    const dispatch = useDispatch();
    const is_staff = useSelector(selectIs_staff);
    const is_superuser = useSelector(selectIs_superuser);
    const is_customer = useSelector(selectIs_customer);
    return (
        <div>
            <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
                <Link to="/flights">View Flights</Link> {" "}|

                {/* if logged- show logout/customer reg, else show login/register */}
                {loginStatus ? <div>
                    {" "}| <button onClick={() => dispatch(logout())}>Logout</button> {" "}| {is_customer ?  <div> <Link to="/custickets"> View Customer Tickets </Link> "edit profile" </div> : <Link to="/addprofile">Customer Registeration</Link>} 
                   </div> : <div> <Link to="/signin">Sign In</Link> {"or "} <Link to="/register">Register</Link></div>}

                {/* admin/airline only */}
                {(is_staff || is_superuser) && <div> {" "}|<Link to="/addflight">Add Flight</Link> {" "}| <Link to="/countrys">View Countries</Link> {" "}| <Link to="/addairline">Airline Registeration</Link> {" "}| </div>}

                {/* admin only (no airline) */}
                {(is_superuser) && <div> {" "}|<Link to="/addcountry">Add Country</Link> {" "}| </div>}

            </nav >

        </div >
    )
}

export default Navbar