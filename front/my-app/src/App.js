import React, { useEffect } from 'react';
import './App.css';
import { checkLogin } from './features/user/loginSlice'
import { useDispatch } from 'react-redux';
import { Outlet } from "react-router-dom";
import Navbar from './features/Navbar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin())
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Navbar/>
        <Outlet />

      </header>
    </div>
  );
}

export default App;
