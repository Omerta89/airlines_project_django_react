import axios from "axios";
const MY_SERVER = " http://127.0.0.1:8000/";

export function getFlights() {
  return new Promise((resolve) =>
    axios(MY_SERVER+"getallflights/").then((res) => resolve({ data: res.data }))
  );
}

export function addFlight(newFlight) {
  return new Promise((resolve) =>
    axios.post(MY_SERVER+"addflight/", newFlight, {
      headers: {
        'Authorization': `Bearer ${newFlight.mysentToken}` 
      }
    }).then((res) => resolve({ data: res.data }))
  , console.log(newFlight));
}

export function deleteFlight(id) {
  return new Promise((resolve) =>
    axios.delete(MY_SERVER+ "deleteflight/").then((res) => resolve({ data: res.data }))
  );
}

export function updFlight(newFlight, id) {
  return new Promise((resolve) =>
    axios
      .put(MY_SERVER + id, newFlight)
      .then((res) => resolve({ data: res.data }))
  );
}
