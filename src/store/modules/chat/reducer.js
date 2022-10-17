import {ALL_CHAT, CHAT_LOADING, GET_CHATS} from "./types";

const initialState = {chats: [], chatLoading: false, messages: []};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CHATS:
            return {...state, messages: action.payload};
        case ALL_CHAT:
            return {...state, chats: action.payload};
        case CHAT_LOADING:
            return {...state, chatLoading: action.payload};
        default:
            return state
    }
}
