import axios from 'axios'
async function registerUser(userData) {
    return axios.post('/api/users', userData).then((response) => response.data)
}

async function loginUser(userData) {
    return axios.post('/api/users/auth', userData).then((response) => response.data)
}

async function logoutUser() {
    return axios.post('/api/users/logout').then((response) => response.data);
}

async function updateUser(userData) {
    return axios.put('/api/users/profile', userData).then((response) => response.data);
}

export { registerUser, loginUser, logoutUser, updateUser }
