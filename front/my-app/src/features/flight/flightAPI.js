import axios from "axios";
const MY_SERVER = " http://127.0.0.1:8000/";

export function getFlights() {
  return new Promise((resolve) =>
    axios(MY_SERVER + "getallflights/").then((res) => resolve({ data: res.data }))
    );
}

export function addFlight(newFlight) {
  return new Promise((resolve) =>
    axios.post(MY_SERVER + "addflight/", newFlight, {
      headers: {
        'Authorization': `Bearer ${newFlight.mysentToken}`
      }
    }).then((res) => resolve({ data: res.data }))
    , console.log(newFlight));
}

export function deleteFlight(myid_token) {
  return new Promise((resolve) =>
    axios.delete(MY_SERVER + "deleteflight/" + myid_token.flight_id, {
      headers: {
        'Authorization': `Bearer ${myid_token.myToken}`
      }
    })
      .then((res) => resolve({ data: res.data }))
    // , console.log(myid_token.flight_id)
  );
}

export function updFlight(newFlight) {
  return new Promise((resolve) =>
    axios
      .put(MY_SERVER + "updflight/" + newFlight.id, newFlight, {
        headers: {
          'Authorization': `Bearer ${newFlight.myToken}`
        }
      })
      .then((res) => resolve({ data: res.data }))

  );
}


