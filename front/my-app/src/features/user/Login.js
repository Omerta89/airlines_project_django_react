import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doLoginAsync, selectlogin, logout, selectUsername, selectBadCredMsg } from "./loginSlice";
const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const loginStatus = useSelector(selectlogin);
  const userName = useSelector(selectUsername);
  const badCredMsg = useSelector(selectBadCredMsg);


  return (
    <div style={{ backgroundColor: "blue" }}>
      <h4> Hello {userName}, this is customer section</h4>
      {badCredMsg ? "The Username or Password is wrong, please try again" : ""} 
      {loginStatus ? (
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
