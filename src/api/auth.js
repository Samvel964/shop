import axios from './index';

export const register = async (data) => {
    return await axios.post('auth/register', data);
}

export const getUser = async () => {
    return await axios.get('auth/user');
}

export const logIn = async (data) => {
    return await axios.post('auth/login',data);
}

export const logOut = async () => {
    return await axios.post('auth/logout');
}
