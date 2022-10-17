import {ChatService} from '../../../services'
import {ALL_CHAT, CHAT_LOADING, CREATE_CHAT, GET_CHATS} from "./types";
import {toast} from "react-toastify";
import {catchError} from "../../../utils";

export const setNewMessage = res => (dispatch) => dispatch({type: CREATE_CHAT, payload: res});
export const setChatList = messages => (dispatch) => dispatch({type: GET_CHATS, payload: messages});
export const setAllChatList = (allChat) => (dispatch) => {
    console.log(allChat)
    dispatch({type: ALL_CHAT, payload: allChat});
}
export const startLoading = () => (dispatch) => dispatch({type: CHAT_LOADING, payload: true});
export const stopLoading = () => (dispatch) => dispatch({type: CHAT_LOADING, payload: false});

export const loadAllChats = () => (dispatch, getState) => {
    // const {User: user} = getState();
    window.Echo.join('ChatList').listen('ChatListEvent', (e) => {
        console.log(e);
    });
    dispatch(startLoading());
    ChatService.allChat().then(({data}) => {
        setAllChatList(data)
    }).catch(() => {

    }).finally(() => {
        dispatch(stopLoading())
    })
};

export const loadChatByOfferID = (AppState) => (dispatch, getState) => {
    dispatch(startLoading());
    ChatService.getOfferChat().then(({data: {messages, chat_id, chats, offer, receiver, task}}) => {
        AppState.setState({task, offer, chat_id, receiver, selected: true});
        dispatch(setChatList(messages));
        dispatch(setAllChatList(chats))
        AppState.scrollToBottom();
    }).catch((e) => {
        // AppState.props.history.goBack();
        toast.dark(e)
    }).finally(() => {
        dispatch(stopLoading())
    })
};

export const loadSingleChats = (receive_id) => (dispatch, getState) => {
    // const {User: user} = getState();
    window.Echo.join('ChatList').listen('ChatListEvent', (e) => {
        console.log(e);
    });
    dispatch(startLoading());
    ChatService.getSingleChat({receive_id}).then(({data}) => {
        setChatList(data)
    }).catch(() => {

    }).finally(() => {
        dispatch(stopLoading())
    })
};
export const sendMessage = (AppState) => (dispatch) => {
    const form = new FormData();
    const {message, chat_id} = AppState.state;
    form.append('message', message);
    form.append('chat_id', chat_id);
    AppState.setState({message: ''});
    var files = document.getElementById('files').files;
    for (var i = 0; i < files.length; i++) {
        form.append("files[]", files[i], files[i]['name']);
    }

    ChatService.createChat(form).then(({data: {messages, chats}}) => {
        dispatch(setChatList(messages));
        dispatch(setAllChatList(chats));
        document.getElementById('chat-form').reset();
        document.getElementById('chat-input').value = '';
        AppState.setState({message: ''});
        AppState.loadChat();
        AppState.scrollToBottom();
    }).catch((e) => {
        catchError(e)
    })
};
