import api from './api';

export const getPeoples = async (token: string) => {
    try {
        const response = await api.get('peoples', { headers: { Authorization: `Bearer ${token}` } });
        return response;
    } catch (err) {
        return err;
    }
};