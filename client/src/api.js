/* api.js
 * Initializes axios instance to reuse base configuration for multiple requests
 * Imported to necessary screens to create API calls
*/

import Axios from 'axios';

const api = Axios.create({
    // baseURL: 'http://localhost:3001', // Replace with actual backend URL
    baseURL: 'http://192.168.0.25:3001',
});

export default api;