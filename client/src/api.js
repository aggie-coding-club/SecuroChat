/* api.js
 * Initializes axios instance to reuse base configuration for multiple requests
 * Imported to necessary screens to create API calls
*/

import Axios from 'axios';

/*
 * During development, am using local tunnel to host API
 * local tunnel domain set to https://securochat-server.loca.lt/ with the following commands:
 * lt --subdomain securochat-server --port 3001
 * ensure local tunnel is installed globally before attempting to connect
*/

const api = Axios.create({
    baseURL: 'http://localhost:3001', // Replace with actual backend URL
});

export default api;