import axios from "axios";
import { setErrors } from "../features/errorsSlice";
import store from '../app/store';

const instance = axios.create({
    baseURL: 'https://reactback.madison.am/api/v1/',
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem('user-token')
    }
});

instance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response.status === 422) {
            store.dispatch(setErrors(error.response.data.errors));
        }else if (error.response.status === 401) {
            console.log('hu hu ' + error.response.data.message);
            if (error.response.status === 401 &&
                ['/dashboard', '/dashboard/categories','/dashboard/products'].includes(window.location.pathname)) {
                    window.location.href = '/'
                }
        } else {
            console.log('something went wrong');
        }
        throw error
    }
);

export default instance
