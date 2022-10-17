export const SERVER = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ?'https://cititasker-api.test/api/' : 'https://api.cititasker.com/';

// export const SERVER = "https://api.cititasker.com/";

const EndPoints = SERVER;

export const REGISTER = EndPoints + "register";

export const LOGIN = EndPoints + "login";

export const CREATE_TASK = `${EndPoints}tasks`;
export const CHATS = `${EndPoints}chat`;
export const CREATE_CHATS = `${EndPoints}chat/message`;
export const OFFER_CHATS = () => {
  const offer_id = new URL(window.location.href).searchParams.get("offer_id");
  return `${EndPoints}chat/offer/${offer_id}`;
};
export const ALL_TASK = `${EndPoints}tasks/all`;
export const GET_TASK = (status) => `${EndPoints}user/task/${status}`;
export const GET_NOTIFICATIONS = `${EndPoints}user/notifications`;
export const SHOW_TASK = (id) => `${EndPoints}tasks/${id}`;
export const CANCEL_TASK = (id) => `${EndPoints}tasks/${id}/cancel`;
export const ACCEPT_OFFER = (id) => `${EndPoints}tasks/offer/${id}/accept`;
export const SUSPEND_TASK = (id) => `${EndPoints}tasks/${id}/draft`;
export const SEND_OFFER = (id) => `${EndPoints}tasks/${id}/offer`;
export const SHOW_TASK_COMMENTS = (id) => `${EndPoints}tasks/comments/${id}`;
export const SHOW_TASK_REPLIES = (id, reply_id) =>
  `${EndPoints}tasks/reply/${id}/${reply_id}`;
export const SEND_COMMENT = (id) => `${EndPoints}tasks/comment/${id}`;
export const SEND_REPLY = (id, reply_id) =>
  `${EndPoints}tasks/reply/${id}/${reply_id}`;

export const DASHBOARD = `${EndPoints}dashboard`;
export const RESEND_VERIFICATION = `${EndPoints}verification-mail`;
export const UPDATE_PROFILE = `${EndPoints}user/update`;
export const UPDATE_DETAILS = `${EndPoints}user/update/details`;
export const UPDATE_PASSWORD = `${EndPoints}update/password`;

export const RESET_PASSWORD = EndPoints + "password/reset";
export const FORGOT_PASSWORD = EndPoints + "password/forgot";
export const FIND_PASSWORD_TOKEN = (token) =>
  `${EndPoints}password/find/${token}`;
export const PROFILE_DETAILS = `${EndPoints}user`;
