import axios from 'axios/index'
import store from '../store/index'
import {SERVER} from "./EndPoints";
import {isNull} from "./index";
import Auth from './AuthenticationHandler'

const baseURL = SERVER;

/**
 * Configure axios to automatically add baseUrl and authorization to needed api request
 */
let TOKEN = '';
export default (tkn = Auth.getStoredToken()) => {
    const token = tkn || store.getState().Auth.token;
    if (token) {
        TOKEN = token;
        const headers = {Authorization: `Bearer ${token}`};
        if (isNull(window.Echo.options.auth)) {
            window.Echo.options.auth = {headers};
        }
        return axios.create({baseURL, headers})
    } else return axios.create({baseURL})
}

export const token = TOKEN;
