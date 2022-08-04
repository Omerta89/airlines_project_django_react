import React, { useEffect } from 'react';
import './App.css';
import Flights from './features/flight/Flights';
import Login from './features/user/Login';
import { checkLogin } from './features/user/loginSlice'
import { useDispatch } from 'react-redux';
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin())
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Login></Login>
        <Flights></Flights>
      </header>
    </div>
  );
}

export default App;
