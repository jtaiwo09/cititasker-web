import React from "react";
import createHistory from "history/createBrowserHistory"
import auth from './AuthenticationHandler'
import {toast as _toast} from 'react-toastify';


export const toast = _toast;
export const Auth = auth;
export const isNull = (value) => (value === null || value === undefined || value === '' || value === 'null');
export const ReportError = (a, b = 'error') => {
    console.log(b, a);
}
export const Naira = '₦';

export const catchAuthError = (error) => {
    if (error.response) {
        const {status} = error.response;
        if (status === 401) {
            auth.logout();
            window.user = null;
            return toast.error('ERROR: You are unauthorized', {autoClose: 10000, position: 'top-center'})
        }
        return catchError(error)
    } else {
        return toast.error(error)
    }
}
export const catchError = (error) => {
    if (error.response) {
        const data = error.response.data;
        if (data.errors) {
            const arr = Object.keys(data.errors);
            arr.forEach(e => {
                data.errors[e].forEach(err => toast.error(<div><b>ERROR:</b><br/>{err}</div>, {
                    autoClose: 10000,
                    position: 'top-center'
                }))
            });
            return
        }
        if (data.error) {
            return toast.error(<div><b>ERROR:</b><br/>{data.error}</div>, {autoClose: 10000, position: 'top-center'})
        }
        if (data.message) {
            return toast.error(<div><b>ERROR:</b><br/>{data.message}</div>, {autoClose: 10000, position: 'top-center'})
        }
    }
    toast.error(<div><b>ERROR:</b><br/>{error.message}</div>, {autoClose: 10000, position: 'top-center'})
}

export const showSuccess = (msg) => toast.success(<div><b>SUCCESS!!!</b><br/>{msg}</div>, {
    autoClose: 10000,
    position: 'top-center'
})
export const showError = (msg) => toast.error(<div><b>Error!!!</b><br/>{msg}</div>, {
    autoClose: 10000,
    position: 'top-center'
})
export const showInfo = (msg) => toast.info(<div><b>ALERT!!!</b><br/>{msg}</div>, {
    autoClose: 10000,
    position: 'top-center'
})

export const history = createHistory();
// Get the current location.
export const location = history.location;
