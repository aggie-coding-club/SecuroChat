/* api.js
 * Initializes axios instance to reuse base configuration for multiple requests
 * Imported to necessary screens to create API calls
 */

import Axios from "axios";

/*
 * During development, am using ngrok local tunneling to expose local host backend server
 * ngrok http 3001
 * ensure ngrok is installed globally before attempting to connect
 */

const api = Axios.create({
  baseURL: "https://333f-136-38-170-68.ngrok-free.app", // Replace with actual backend URL. If in development, replace with ngrok url
});

export default api;
