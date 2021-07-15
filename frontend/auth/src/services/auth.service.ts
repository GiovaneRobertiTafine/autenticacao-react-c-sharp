import { User } from '../interfaces/User';
import api from './api';

export let user: User = null;

export const isAuthenticated = async (): Promise<boolean> => {
    const token = getToken();
    if (token) {
        let response: boolean = false;
        await checkTokenValidation()
            .then((res) => {
                response = res;
            })
            .catch((err) => response = false);
        return response;
    } else {
        return false;
    }
};

export const loginService = async (data: User) => {
    try {
        const response = await api.post('login', data);
        setToken(response.data);
        user = response.data;
        return response;
    } catch (err) {
        return err;
    }
};

export const setToken = (u: User) => {
    localStorage.setItem('token', u.token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const checkTokenValidation = async () => {
    try {
        const response = await api.get('authenticated', { headers: { Authorization: `Bearer ${getToken()}` } });
        user = response.data;
        return true;
    } catch (err) {
        return false;
    }
};



