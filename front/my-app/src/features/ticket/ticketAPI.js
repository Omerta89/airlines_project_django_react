import axios from "axios";
const MY_SERVER = " http://127.0.0.1:8000/";

export function getTickets(info) {
  return new Promise((resolve) =>
    axios(MY_SERVER + "getallticket/", info, {
      headers: {
        'Authorization': `Bearer ${info.myToken}`
      }
    }).then((res) => resolve({ data: res.data }))
    );
}


export function getTicketforCustomer(info) {
  return new Promise((resolve) =>
    axios(MY_SERVER + "getcusticket/", {
      headers: {
        'Authorization': `Bearer ${info.myToken}`
      }
    }).then((res) => resolve({ data: res.data }))
    );
}


export function addTicket(newTicket) {
  console.log("add ticket", newTicket)
  return new Promise((resolve) =>
    axios.post(MY_SERVER + "addticket/", newTicket, {
      headers: {
        'Authorization': `Bearer ${newTicket.myToken}`
      }
    }).then((res) => resolve({ data: res.data }))
    );
}

export function deleteTicket(myid_token) {
  return new Promise((resolve) =>
    axios.delete(MY_SERVER + "deleteticket/" + myid_token.ticket_id, {
      headers: {
        'Authorization': `Bearer ${myid_token.myToken}`
      }
    })
      .then((res) => resolve({ data: res.data }))
    // , console.log(myid_token.ticket_id)
  );
}

export function updTicket(newTicket) {
  return new Promise((resolve) =>
    axios
      .put(MY_SERVER + "updticket/" + newTicket.id, newTicket, {
        headers: {
          'Authorization': `Bearer ${newTicket.myToken}`
        }
      })
      .then((res) => resolve({ data: res.data }))
  );
}
