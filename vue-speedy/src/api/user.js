import axios from '../libs/axios'
export const login = (loginForm) => {
    return axios.post('/api/login', loginForm);
};

export const getUserInfo = () => {
    return axios.get('/api/pt/userinfo')
};

export const logout = (token) => {
    return axios.post('/api/logout');
};
