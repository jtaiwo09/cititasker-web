import {CHATS,CREATE_CHATS, OFFER_CHATS} from '../utils/EndPoints';
import Request from "../utils/Request";

class ChatService {
    createChat = form_data => Request().post(CREATE_CHATS, form_data);
    allChat = () => Request().get(CHATS);
    getSingleChat = (form_data) => Request().post(CHATS, form_data);
    getOfferChat = () => Request().get(OFFER_CHATS());

}

export default new ChatService();
