import axios from "axios";
const MY_SERVER = " http://127.0.0.1:8000/";


export function getCountrys() {
  return new Promise((resolve) =>
    axios(MY_SERVER + "getallcountrys/").then((res) => resolve({ data: res.data }))
  );
}

export function addCountry(newCountry) {
  console.log("token", newCountry.mysentToken.length)
  return new Promise((resolve) =>
    axios.post(MY_SERVER + "addcountry/", newCountry, {
      headers: {
        'Authorization': `Bearer ${newCountry.mysentToken}`
      }
    }).then((res) => resolve({ data: res.data }))
  );
}

// to be used
// export function deleteCountry(myid_token) {
//   return new Promise((resolve) =>
//     axios.delete(MY_SERVER + "deletecountry/" + myid_token.country_id, {
//       headers: {
//         'Authorization': `Bearer ${myid_token.myToken}`
//       }
//     })
//       .then((res) => resolve({ data: res.data }))
//     // , console.log(myid_token.country_id)
//   );
// }

// export function updCountry(newCountry) {
//   return new Promise((resolve) =>
//     axios
//       .put(MY_SERVER + "updcountry/" + newCountry.id, newCountry, {
//         headers: {
//           'Authorization': `Bearer ${newCountry.myToken}`
//         }
//       })
//       .then((res) => resolve({ data: res.data }))

//   );
// }


