import {createBrowserHistory,} from 'history'
import {isNull} from './index';
import {TOKEN_HASH} from "./Constants";

const history = createBrowserHistory();

class Auth {
    login = (token = '') => window.localStorage.setItem(TOKEN_HASH, token);

    logout = () => {
        window.localStorage.clear();
        history.replace('/logout');
    }
    isAuthenticated = () => !isNull(window.localStorage.getItem(TOKEN_HASH));

    getStoredToken = () => window.localStorage.getItem(TOKEN_HASH);
}

export default new Auth();
