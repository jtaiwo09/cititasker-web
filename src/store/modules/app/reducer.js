import {
    EDIT_OFFER,
    ERROR,
    IS_CONNECTED,
    IS_LOADING,
    NEW_TASK,
    SET_REFERER,
    SHOW_ACCOUNT_UPDATE,
    SHOW_LOADER,
    SHOW_NAV_SETTING, EDIT_OFFER_TOGGLE,
    SHOW_OFFER,
    SHOW_TASK, SET_APP_STATE, TASK_TITLE, TASK_DESCRIPTION
} from './types';

const initialState = {
    isLoading: false,
    newOrders: [],
    orders: [],
    task: {
        descriptionError: false,
        titleError: false,
        step: 'details',
        inPerson: true,
        hours: 1, budget: 2000,
        isLoading: false,
        title: '',
        _title: '',
        description: '',
    }, offer: {},
    showLoader: false,
    showNavSetting: false,
    referer: false,
    error: {}, showPostTask: false,
    isConnected: null,
    hasError: false, showAccountUpdate: false, showOffer: false, editOffer: false, showReview: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case IS_CONNECTED:
            return {...state, isConnected: action.payload};
        case IS_LOADING:
            return {...state, isLoading: action.payload};
        case SHOW_NAV_SETTING:
            return {...state, showNavSetting: action.payload};
        case ERROR:
            return {...state, error: action.payload};
        case SHOW_LOADER:
            return {...state, showLoader: action.payload};
        case SHOW_TASK:
            return {...state, showPostTask: action.payload};
        case SET_REFERER:
            return {...state, referer: action.payload};
        case SHOW_OFFER:
            return {...state, showOffer: action.payload};
        case NEW_TASK:
            return {...state, task: {...state.task, ...action.payload, _title: action.payload?.title}};
        case EDIT_OFFER:
            return {...state, offer: {...state.offer, ...action.payload}};
        case EDIT_OFFER_TOGGLE:
            return {...state, editOffer: action.payload};
        case SHOW_ACCOUNT_UPDATE:
            return {...state, showAccountUpdate: action.payload};
        case TASK_TITLE:
            return {...state, task: {...state.task, title: action.payload, _title: action.payload}};
        case TASK_DESCRIPTION:
            return {...state, task: {...state.task, description: action.payload}};
        case SET_APP_STATE:
            return {...state, ...action.payload};
        default:
            return state;
    }
}
