import {
	APP_TOKEN, EMAIL, ERROR, IS_LOADING, IS_LOGGEDIN,
	MADA, PASSWORD, UID, DRIVER_NUMBER,
} from './types';

const initialState = {
	isLoading: false,
	uid: '',
	email: '',
	password: '',
	isLoggedin: false,
	error: '',
	mada: false,
    token: '',
    number: '',
	user: {},
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case IS_LOADING:
			return {
				...state,
				isLoading: action.payload
			};
		case EMAIL:
			return {
				...state,
				email: action.payload
			};
		case PASSWORD:
			return {
				...state,
				password: action.payload
			};
		case IS_LOGGEDIN:
			return {
				...state,
				isLoggedin: action.payload
			};
		case UID:
			return {
				...state,
				uid: action.payload
			};
		case MADA:
			return {
				...state,
				mada: action.payload
			};
		case ERROR:
			return {
				...state,
				error: action.payload
			};
		case DRIVER_NUMBER:
			return {
				...state,
				number: action.payload
			};
		case APP_TOKEN:
			return {
				...state,
				token: action.payload
			};

		// case USER:
		// 	return {
		// 		...state,
		// 		user: action.payload
		// 	};
		default:
			return state;
	}
}
