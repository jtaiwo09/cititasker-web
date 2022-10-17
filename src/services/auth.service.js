import {
    FIND_PASSWORD_TOKEN,
    FORGOT_PASSWORD,
    LOGIN,
    PROFILE_DETAILS,
    REGISTER,
    RESET_PASSWORD,
    UPDATE_DETAILS,
    UPDATE_PASSWORD,
    UPDATE_PROFILE
} from '../utils/EndPoints';
import Request from "../utils/Request";

class AuthService {
    update = form_data => Request().post(UPDATE_PROFILE, form_data);

    requestPhoneUpdate = (form_data) => Request().patch('phone/update', form_data);

    updatePhone = (form_data) => Request().put('phone/update', form_data);

    updateDetails = form_data => Request().post(UPDATE_DETAILS, form_data);

    login = form_data => Request().post(LOGIN, form_data);

    register = form_data => Request().post(REGISTER, form_data);

    resetPassword = form_data => Request().post(RESET_PASSWORD, form_data);

    forgetPassword = form_data => Request().post(FORGOT_PASSWORD, form_data);

    verifyToken = token => Request().get(FIND_PASSWORD_TOKEN(token));

    editPassword = data => Request().post(UPDATE_PASSWORD, data).then(r => r.data);

    findById = () => Request().get(PROFILE_DETAILS);
    contact = (formdata) => Request().post('contact', formdata);
}

export default new AuthService();
