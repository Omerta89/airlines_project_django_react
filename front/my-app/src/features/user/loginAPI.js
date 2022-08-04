import axios from "axios";
const MY_SERVER = "http://127.0.0.1:8000/token/";



export function doLogin(credentials) {
  return new Promise((resolve) =>
    axios
      .post(MY_SERVER, credentials)
      .then((res) => resolve({ data: res.data }))
  );
}
