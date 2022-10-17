import {toast} from "react-toastify";
import Auth from '../../../utils/AuthenticationHandler';
import {
    EDIT_OFFER,
    EDIT_OFFER_TOGGLE,
    ERROR,
    IS_CONNECTED,
    IS_LOADING,
    NEW_TASK,
    SET_REFERER,
    SHOW_ACCOUNT_UPDATE,
    SHOW_LOADER,
    SHOW_NAV_SETTING,
    SHOW_OFFER,
    SHOW_TASK, SET_APP_STATE, TASK_DESCRIPTION, TASK_TITLE
} from './types';


export const setConnected = isConnected => dispatch => dispatch({type: IS_CONNECTED, payload: isConnected});

export const setLoading = isLoading => dispatch => dispatch({type: IS_LOADING, payload: isLoading});

export const setAppState = (state) => dispatch => {
    if (typeof (state) === 'object')
        dispatch({type: SET_APP_STATE, payload: state});
}

const setShowLoader = show_loader => dispatch => dispatch({type: SHOW_LOADER, payload: show_loader});

export const setTask = task => dispatch => dispatch({type: NEW_TASK, payload: task});

const setOffer = offer => dispatch => dispatch({type: EDIT_OFFER, payload: offer});

const setNavSetting = state => dispatch => dispatch({type: SHOW_NAV_SETTING, payload: state});

export const openNavSetting = () => dispatch => dispatch(setNavSetting(true));

export const closeNavSetting = () => dispatch => dispatch(setNavSetting(false));

const setReferer = state => dispatch => dispatch({type: SET_REFERER, payload: state});

export const openReferer = () => dispatch => dispatch(setReferer(true));

export const closeReferer = () => dispatch => dispatch(setReferer(false));

export const openLoaderModal = () => dispatch => dispatch(setShowLoader(true));

export const closeLoaderModal = () => dispatch => dispatch(setShowLoader(false));

export const setTaskDescription = des => (dispatch, getState) => dispatch({type: TASK_DESCRIPTION, payload: des})

export const setTaskTitle = title => (dispatch, getState) => dispatch({type: TASK_TITLE, payload: title})

export const togglePostATask = (title = '', description = '') => (dispatch, getState) => {
    const {is_verified} = getState().User
    if (Auth.isAuthenticated() && !is_verified) {
        return toast.dark('Please verify your email')
    }
    const {showPostTask} = getState().Application;
    dispatch({type: SHOW_TASK, payload: !showPostTask});
    // if (typeof title === 'string')
        // dispatch(setTaskTitle(title));
    dispatch(setTaskDescription(description));
};
export const postSimilar = () => (dispatch, getState) => {
    const {is_verified} = getState().User
    if (Auth.isAuthenticated() && !is_verified) {
        return toast.dark('Please verify your email')
    }
    const {showPostTask} = getState().Application;
    dispatch({type: SHOW_TASK, payload: !showPostTask});
};

export const toggleOffer = (task = null) => (dispatch, getState) => {
    const {is_verified} = getState().User
    if (!is_verified) {
        return toast.dark('Please verify your email')
    }
    dispatch(setTask(task))
    const {showOffer} = getState().Application;
    dispatch({type: SHOW_OFFER, payload: !showOffer});
};

export const toggleEditOffer = (offer = null, task = null) => (dispatch, getState) => {
    const {is_verified} = getState().User
    if (!is_verified) {
        return toast.dark('Please verify your email')
    }
    dispatch(setOffer(offer));
    dispatch(setTask(task));
    const {editOffer} = getState().Application;
    dispatch({type: EDIT_OFFER_TOGGLE, payload: !editOffer});
};

export const toggleAccountUpdate = () => (dispatch, getState) => {
    const {showAccountUpdate} = getState().Application;
    dispatch({type: SHOW_ACCOUNT_UPDATE, payload: !showAccountUpdate});
};

export const setError = error => dispatch => dispatch({type: ERROR, payload: error});
