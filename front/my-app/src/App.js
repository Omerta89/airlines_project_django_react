import React, { useEffect } from 'react';
import './App.css';
import { checkLogin } from './features/user/loginSlice'
import { useDispatch } from 'react-redux';
import { Link, Outlet } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin())
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
          <Link to="/login">login</Link>|
          <Link to="/flights">flights</Link>|{" "}
          <Outlet />
        </nav>
      </header>
    </div>
  );
}

export default App;
