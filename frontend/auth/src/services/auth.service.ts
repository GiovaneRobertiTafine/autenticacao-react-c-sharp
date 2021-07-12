import { User } from '../interfaces/User';
import api from './api';

export const isAuthenticated = async () => {
    try {
        const response = await api.get('Authenticated');
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};

export const loginService = async (data: User) => {
    try {
        const response = await api.post('login', data);
        setToken(response.data);
        return response;
    } catch (err) {
        return err;
    }
};

export const setToken = (u: User) => {
    console.log(u);
    localStorage.setItem('token', u.token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};



