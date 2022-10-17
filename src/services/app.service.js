import {
    ACCEPT_OFFER,
    ALL_TASK,
    CANCEL_TASK,
    CREATE_TASK,
    GET_NOTIFICATIONS,
    GET_TASK,
    RESEND_VERIFICATION,
    SEND_COMMENT,
    SEND_OFFER,
    SEND_REPLY,
    SHOW_TASK,
    SHOW_TASK_COMMENTS,
    SHOW_TASK_REPLIES,
    SUSPEND_TASK,
} from '../utils/EndPoints';
import Request from "../utils/Request";

class AppService {
    createTask = form_data => Request().post(CREATE_TASK, form_data);
    allTask = () => Request().get(ALL_TASK);
    getSingleTask = id => Request().get(SHOW_TASK(id));
    getUserTask = (status = 'ALL') => Request().get(GET_TASK(status));
    getUserNotifications = () => Request().get(GET_NOTIFICATIONS);
    updateSingleTask = (id, form_data) => Request().post(SHOW_TASK(id), form_data);
    deleteSingleTask = id => Request().delete(SHOW_TASK(id));
    cancelSingleTask = id => Request().get(CANCEL_TASK(id));
    acceptOffer = id => Request().get(ACCEPT_OFFER(id));

    getMyOffer = id => Request().get(`tasks/my-offer/${id}`);

    suspendSingleTask = id => Request().get(SUSPEND_TASK(id));
    getTaskComments = id => Request().get(SHOW_TASK_COMMENTS(id));
    getTaskCommentReply = (id, reply) => Request().get(SHOW_TASK_REPLIES(id, reply));

    resendVerification = () => Request().get(RESEND_VERIFICATION);
    sendComment = (id, formData) => Request().post(SEND_COMMENT(id), formData);
    sendOffer = (id, formData) => Request().post(SEND_OFFER(id), formData);
    sendOfferComment = (formData) => Request().post('tasks/offer/comment', formData);
    getOfferComments = (id) => Request().get(`tasks/offer/comments/${id}`);
    sendReply = (task_id, id, formData) => Request().post(SEND_REPLY(task_id, id), formData);
    verifyBankInfo = (acct, bank) => Request().get(`user/bank-verification/${acct}/${bank}`);

    editOffer = (offer) => Request().patch(`tasks/offer/${offer.id}`, offer);

    getUserById = (uuid) => Request().get(`user-profile/${uuid}`);
    requestFund = (task_id) => Request().get(`tasks/request-payment/${task_id}`);
    completeTask = formData => Request().post('tasks/complete', formData);
    deleteOffer = id => Request().get('tasks/withdraw/offer/' + id);
}

export default new AppService();
