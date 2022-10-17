import {createBrowserHistory,} from 'history'
import {APP_TOKEN, EMAIL, IS_LOADING, IS_LOGGEDIN, PASSWORD, USER} from './types';
import {AuthService} from '../../../services';
import Auth from "../../../utils/AuthenticationHandler";
import {toast} from "react-toastify";
// import {persistor} from "../../index";
import {closeLoaderModal, openLoaderModal} from "../app";
import {catchError} from "../../../utils";

const history = createBrowserHistory();


export const setLoading = isLoading => dispatch => dispatch({type: IS_LOADING, payload: isLoading});

export const setEmail = email => dispatch => dispatch({type: EMAIL, payload: email});

export const setToken = token => dispatch => {
    Auth.login(token);
    dispatch({type: APP_TOKEN, payload: token});
};

export const setUser = user => dispatch => dispatch({type: USER, payload: user});

export const setPassword = password => dispatch => dispatch({type: PASSWORD, payload: password});

export const setLoggedin = isLoggedin => dispatch => dispatch({type: IS_LOGGEDIN, payload: isLoggedin});


export const login = (data, setSubmitting, replace) => async (dispatch, getState) => {
    AuthService.login(data).then((response) => {
        setSubmitting(false);
        const {data: {token, user}} = response.data;
        dispatch(setUser(user));
        dispatch(setLoggedin(true));
        dispatch(setToken(token));
        toast.success('Login Successful');
        replace('/account');
    }).catch(error => {
        catchError(error);
        setSubmitting(false);
    });
};
let email = ''
export const forgetPassword = (data, setSubmitting, replace) => async (dispatch, getState) => {
    email = data.email
    AuthService.forgetPassword(data).then((response) => {
        setSubmitting(false);
        toast.success('Check your mail we have sent a password reset link', {
            position: "top-right",
            autoClose: 15000,
        });
        replace('/reset-password');
    }).catch(error => {
        catchError(error);
        setSubmitting(false);
    });
};


export const resetPassword = (data, setSubmitting, replace) => async (dispatch, getState) => {
    AuthService.verifyToken(data.token).then((res) => {
        data.email = email;
        AuthService.resetPassword(data).then((response) => {
            setSubmitting(false);
            toast.success('Password reset was successful, Please login', {autoClose: 15000});
            replace('/login');
        }).catch(error => {
            catchError(error);
            setSubmitting(false);
        });
    }).catch((e) => {
        setSubmitting(false);
        catchError(e)
    })
};

export const verifyToken = (token) => async (dispatch, getState) => {
    AuthService.verifyToken(token).then(({data}) => {
        console.log(data)
        toast.success('Token verified successfully',);
    }).catch(error => {
        catchError(error);
    });
};


export const updateProfile = (data) => (dispatch, getState) => {
    dispatch(openLoaderModal());
    AuthService.update(data).then((response) => {
        const {data: user} = response.data;
        dispatch(setUser(user));
        toast.success('Profile Update was Successful');
    }).catch(catchError).finally(() => {
        dispatch(closeLoaderModal())
    });
};


export const updateProfileDetails = (data) => (dispatch, getState) => {
    dispatch(openLoaderModal());
    AuthService.updateDetails(data).then((response) => {
        const {data: user} = response.data;
        dispatch(setUser(user));
        toast.success('Profile Update was Successful');
    }).catch(error => {
        console.log(error.response)
        if (error.response) {
            const data = error.response.data;
            if (data.errors) {
                const arr = Object.keys(data.errors);
                arr.forEach(e => {
                    data.errors[e].forEach(err => toast.error('ERROR: ' + err))
                });
                return
            }
            return toast.dark('ERROR: ' + error.response.data.error)
        }
        toast.dark('ERROR: ' + error.message)
    }).finally(() => {
        dispatch(closeLoaderModal())
    });
};

export const updateProfilePassword = (data) => (dispatch, getState) => {
    dispatch(openLoaderModal());
    AuthService.editPassword(data).then((response) => {
        const form = document.getElementById('passwordForm');
        if (form.length) {
            form.reset();
        }
        toast.success('Password Update was Successful');
    }).catch(catchError).finally(() => {
        dispatch(closeLoaderModal())
    });
};


export const loadUserDetails = () => (dispatch, getState) => {
    const user = getState().User;

    dispatch(setToken(Auth.getStoredToken()));
    if (Object.entries(user).includes('email')) {
        return;
    }
    dispatch(setLoggedin(true));
    dispatch(openLoaderModal());
    AuthService.findById().then((response) => {
        const {data: user} = response.data;
        dispatch(setUser(user));
    }).catch(error => {

    }).finally(() => {
        dispatch(closeLoaderModal())
    });
};

export const fetchUser = () => (dispatch, getState) => {
    console.log('Workih')
    AuthService.findById().then((response) => {
        const {data: user} = response.data;
        dispatch(setUser(user));
    }).catch(error => {
        if (error.response) {
            const data = error.response.data;
            if (Number(error.response.status) === 400) {
                if (Auth.isAuthenticated()) {
                    if (data.status === 'Authorization Token not found' || data.status === 'Token is Invalid'
                        || data.status === 'Token is Expired') {
                        toast.dark(data.status);
                        return history.push('/logout')
                    }
                }
            }
            if (Number(error.response.status) === 401) {
                if (Auth.isAuthenticated()) {
                    if (data.status === 'Authorization Token not found' || data.status === 'Token is Invalid'
                        || data.status === 'Token is Expired') {
                        toast.dark(data.status);
                        return history.push('/logout')
                    }
                }
            }


        }

    })
};

export const logout = () => async (dispatch, getState) => {
    // persistor.purge();
    dispatch(setUser({}));
    dispatch(setLoggedin(false));
    dispatch(setToken(''));
    window.localStorage.clear();
    return history.push('/login')
};

export const register = (data) => async (dispatch, getState) => {
    return await AuthService.register(data);
};
