/* api.js
 * Initializes axios configuration to point to running backend server
 * Imported to necessary screens to create API calls
*/

import Axios from 'axios';

const api = Axios.create({
    baseURL: 'http://localhost:3001', // Replace with actual backend URL
    withCredentials: true,
});

export default api;