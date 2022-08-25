import axios from "axios";
const MY_SERVER = "http://127.0.0.1:8000/";



export function doLogin(credentials) {
  return new Promise((resolve) =>
    axios
      .post(MY_SERVER + "token/", credentials)
      .then((res) => resolve({ data: res.data }), console.log(credentials))
  );
}


export function doRegister(info) {
  return new Promise((resolve) =>
    axios
      .post(MY_SERVER + "adduser/", info)
      .then((res) => resolve({ data: res.data }), console.log(info))
  );
}

// customer registeration
export function doCustomerRegister(info) {
  return new Promise((resolve) =>
    axios
      .post(MY_SERVER + "addprofile/", info, {
        headers: {
          'Authorization': `Bearer ${info.myToken}`
        }
      })
      .then((res) => resolve({ data: res.data }), console.log(info))
  );
}

// get single profile -- this is more for a client then admin
export function getProfile(credentials) {
  return new Promise((resolve) =>
    axios(MY_SERVER + "cusprofile/", credentials, {
      headers: {
        'Authorization': `Bearer ${credentials.myToken}`
      }
    }).then((res) => resolve({ data: res.data }))
  );
}

// customer/profile update
export function updCustomerRegister(newInfo) {
  return new Promise((resolve) =>
    axios
      .put(MY_SERVER + "updcusprofile/" + newInfo.id, newInfo, {
        headers: {
          'Authorization': `Bearer ${newInfo.myToken}`
        }
      })
      .then((res) => resolve({ data: res.data }))

  );
}


// customer registeration
export function doAirlineRegister(info) {
  return new Promise((resolve) =>
    axios
      .post(MY_SERVER + "addairlineforuser/", info, {
        headers: {
          'Authorization': `Bearer ${info.myToken}`
        }
      })
      .then((res) => resolve({ data: res.data }), console.log(info))
  );
}
