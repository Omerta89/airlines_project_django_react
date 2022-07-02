import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
function App() {
    let [notes, setNotes] = useState([]);
    const [username, setUsername] = useState("")
    const getNotes = async () => {
        let aTok = JSON.parse(localStorage.getItem("authTokens")).access;
        console.log(String(aTok));
        let response = await fetch("http://127.0.0.1:8000/notes/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + String(aTok),
            },
        });
        let data = await response.json();
 
        if (response.status === 200) {
            setNotes(data);
            console.log("get data");
        } else if (response.statusText === "Unauthorized") {
            console.log("logoutUser();");
        }
    };
 
    const login = async () => {
        // console.log("bef");
        let response = await fetch("http://127.0.0.1:8000/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: "123",
            }),
        });
        let data = await response.json();
 
        if (response.status === 200) {
            console.log(jwt_decode(data.access));
            // setUser(jwt_decode(data.access))
            localStorage.setItem("authTokens", JSON.stringify(data));
            // history.push('/')
        } else {
            alert("Something went wrong!");
        }
    };
    return (
        <div className="App">
            <header className="App-header">
                simp
                <input value={username} onChange={(e)=>setUsername(e.target.value)}/>
                <button onClick={() => login()}>Login</button>
                <button onClick={() => getNotes()}>Notes</button>
                <ul>
                    {notes.map((note) => (
                        <li key={note.id}>{note.body}</li>
                    ))}
                </ul>
            </header>
        </div>
    );
}
 
export default App;
