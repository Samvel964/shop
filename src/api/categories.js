import axios from './index';

export const getAllCategories = async () => {
    return await axios.get('categories');
}

export const createCategory = async (data) => {
    return await axios.post('categories', data);
}

export const deleteCategory = async (id) => {
    return await axios.delete(`categories/${id}`);
}

export const editCategory = async (id,data) => {
    return await axios.post(`categories/${id}`, data);
}
