import api from './api';

export const getProducts = async (token: string) => {
    try {
        const response = await api.get('products', { headers: { Authorization: `Bearer ${token}` } });
        return response;
    } catch (err) {
        return err;
    }
};
