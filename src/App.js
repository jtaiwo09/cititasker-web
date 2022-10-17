import 'animate.css/animate.compat.css';
import React, {Component} from 'react';
import {connect, Provider} from 'react-redux';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./assets/scss/design.scss";
import './assets/scss/main.scss';
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/vendor/nucleo/css/nucleo.css";
// import {PersistGate} from 'redux-persist/integration/react'
import {AppRoute, GuestRoute} from "./components/AppRoute";
import AboutUs from "./pages/AboutUs";
import Categories from './pages/Categories';
import ContactUs from "./pages/ContactUs";
import Home from "./pages/home/";
import HowITWorks from "./pages/HowITWorks";
import LoginScreen from "./pages/Login";
import Privacy from "./pages/Privacy";
import Register from "./pages/Register";
import Join from "./pages/tasker/";
import Terms from "./pages/Terms";
import BrowseTask from "./pages/user/browse-task";
import UserDashboard from "./pages/user/dashboard";
import MyTask from "./pages/user/my-task";
import Notifications from "./pages/user/notifications";
import PaymentHistory from "./pages/user/payment-history";
import PaymentMethod from "./pages/user/payment-method";
import ReferFriend from "./pages/user/refer-a-friend";
import ProfileScreen from "./pages/settings/profile";
import MobileEdit from "./pages/settings/mobile";
import AlertScreen from "./pages/settings/alerts";
import PasswordEdit from "./pages/settings/password";
import NotVerified from "./pages/settings/not-verified";
import NotificationEdit from "./pages/settings/notification";
import Portfolio from "./pages/settings/portfolio";
import Skills from "./pages/settings/skills";
import _404, {_500} from "./pages/_404";
import store from './store';
import SingleTask from "./pages/user/single-task";
import ForgetPassword from "./pages/ForgetPassword";
import ChangePassword from "./pages/ChangePassword";
import VerifyToken from "./pages/VerifyToken";
import Chat from './pages/user/Chat'
import Echo from "laravel-echo"
import {fetchUser, logout} from "./store/modules/auth";
import Layout from "./components/Layout";

import UserProfile from "./pages/UserProfile";
import Guildlines from './pages/Guidlines';

window.Pusher = require('pusher-js');

class _Logout extends Component<{}> {
    render() {
        this.props.logout();
        return <Redirect to="/"/>
    }
}

const Logout = connect(null, {logout})(_Logout)

class AppRouter extends Component {
    componentDidMount() {
        store.dispatch(fetchUser());
    }

    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({hasError: true});
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
        // alert("Error on system")
        // history.push('500');
        console.log(error, info)
    }


    render() {
        if (this.state.hasError) {
            return <Layout/>
        }


        return (
            <Router>
                <Switch>
                    <GuestRoute exact path="/" component={Home}/>
                    <GuestRoute exact path="/join" component={Join}/>
                    <Route exact path="/categories" component={Categories}/>
                    <Route exact path="/tasks" component={Terms}/>
                    <Route exact path="/terms" component={Terms}/>
                    <Route exact path="/privacy" component={Privacy}/>
                    <Route exact path="/how-it-works" component={HowITWorks}/>
                    <Route exact path="/contact-us" component={ContactUs}/>
                    <Route exact path="/support" component={ContactUs}/>
                    <Route exact path="/about-us" component={AboutUs}/>
                    <Route exact path="/community-guidlines" component={Guildlines}/>
                    {/*Start Auth Routes*/}
                    <GuestRoute exact path="/login" component={LoginScreen}/>
                    <GuestRoute exact path="/register" component={Register}/>
                    <GuestRoute exact path="/how-it-works" component={HowITWorks}/>
                    {/*End Auth Routes*/}
                    <AppRoute path="/account" exact component={UserDashboard}/>
                    <AppRoute path="/account/profile" exact component={ProfileScreen}/>
                    <AppRoute path="/account/skills" exact component={Skills}/>
                    <AppRoute path="/account/alert" exact component={AlertScreen}/>
                    <AppRoute path="/account/notifications" exact component={NotificationEdit}/>
                    <AppRoute path="/account/password" exact component={PasswordEdit}/>
                    <AppRoute path="/account/portfolio" exact component={Portfolio}/>
                    <AppRoute path="/account/mobile" exact component={MobileEdit}/>
                    <AppRoute path="/message" component={Chat}/>
                    <Route path="/browse-task" component={BrowseTask}/>
                    <Route path="/task" exact component={BrowseTask}/>
                    <Route path="/task/:task" exact component={SingleTask}/>
                    <Route path="/users/:uuid" exact component={UserProfile}/>
                    <AppRoute path="/my-task" component={MyTask}/>
                    <AppRoute path="/payment-history" component={PaymentHistory}/>
                    <AppRoute path="/payment-method" component={PaymentMethod}/>
                    <AppRoute path="/notifications" component={Notifications}/>
                    <AppRoute path="/refer-a-friend" component={ReferFriend}/>
                    <Route path="/reset-password/:token" component={VerifyToken}/>
                    <Route exact path="/reset-password" component={VerifyToken}/>
                    <GuestRoute exact path="/change-password/:token" component={ChangePassword}/>
                    <GuestRoute exact path="/forgot" component={ForgetPassword}/>
                    <Route exact path="/account/not-verify" component={NotVerified}/>
                    <Route exact path="/account/verify/:status" component={NotVerified}/>
                    <Route exact path="/logout" component={Logout}/>
                    <Route exact path="500" component={_500}/>
                    <Route path="*" component={_404}/>
                    <Redirect to="/"/>
                </Switch>
            </Router>
        )
    }
}

function App() {
    window.Echo = new Echo({
        broadcaster: 'pusher', key: 'cititasker_key', wsHost: 'socket.cititasker.com',
        // wsPort: 6001,
        forceTLS: false, transports: ['websocket'],
    });

    return (
        <Provider store={store}>
            {/*<PersistGate loading={null} persistor={persistor}>*/}
                <>
                    <ToastContainer/>
                    <AppRouter/>
                </>
            {/*</PersistGate>*/}
        </Provider>
    );
}

export default App;
