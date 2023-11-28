/* api.js
 * Initializes axios instance to reuse base configuration for multiple requests
 * Imported to necessary screens to create API calls
*/

import Axios from 'axios';

/*
 * During development, am using ngrok local tunneling to expose local host backend server
 * ngrok http 3001
 * ensure ngrok is installed globally before attempting to connect
*/

const api = Axios.create({
    baseURL: 'https://9189-2605-ad80-31-e055-7449-bd3e-9116-2dfc.ngrok-free.app', // Replace with actual backend URL. If in development, replace with ngrok url
});

export default api;