import axios from 'axios'
//
const baseURL = 'https://mernauthbackend-sr71.onrender.com'
console.log(baseURL);
async function registerUser(userData) {
    return axios.post(`${baseURL}/api/users`, userData).then((response) => response.data)
}

async function loginUser(userData) {
    return axios.post(`${baseURL}/api/users/auth`, userData).then((response) => response.data)
}

async function logoutUser() {
    return axios.post(`${baseURL}/api/users/logout`).then((response) => response.data);
}

async function updateUser(userData) {
    return axios.put(`${baseURL}/api/users/profile`, userData).then((response) => response.data);
}

export { registerUser, loginUser, logoutUser, updateUser }
