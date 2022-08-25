import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIs_active, selectIs_staff, selectIs_superuser, doLoginAsync, selectlogin, logout, selectUsername, selectBadCredMsg } from "./loginSlice";
const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("regular joe");
  const [pwd, setPwd] = useState("12345678");
  const loginStatus = useSelector(selectlogin);
  const userName = useSelector(selectUsername);
  const badCredMsg = useSelector(selectBadCredMsg);
  const is_active = useSelector(selectIs_active);
  const is_staff = useSelector(selectIs_staff); 
  const is_superuser = useSelector(selectIs_superuser);

  return (
    <div style={{ backgroundColor: "blue" }}>
      {badCredMsg ? "The Username or Password is wrong, please try again" : ""}
      <h5> {loginStatus ? `Hello ${userName}, this is customer section` : "Hello annoymous User, this is customer section"} </h5>
      {is_active && "This user is active "}
      {is_staff && "This user is staff "}
      {is_superuser && "This user is superuser "}

      {loginStatus ? (
      // validation needed if token valid?? or expired 
        <button onClick={() => dispatch(logout())}>Logout</button>
      ) : (
        <div>
          User: <input onChange={(e) => setUser(e.target.value)} />
          Password: <input type={"password"} onChange={(e) => setPwd(e.target.value)} />
          <button onClick={() =>
            dispatch(doLoginAsync({ username: user, password: pwd }))}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
