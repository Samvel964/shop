import axios from './index';

export const getAllProducts = async () => {
    return await axios.get('products');
}

export const createProduct = async (data) => {
    return await axios.post('products', data);
}

export const deleteProduct = async (id) => {
    return await axios.delete(`products/${id}`);
}

export const editProduct = async (id, data) => {
    return await axios.post(`products/${id}`, data);
}
