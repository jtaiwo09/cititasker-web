import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import styles from "../assets/scss/user-layout.module.scss"
import UserHeader from "../components/UserHeader";
import PostTask from "../components/Modals/PostATask";
import NewUser from "../components/Modals/NewUser";
import Loader from "../components/Modals/Loader";
import AccountStatus from "../components/Modals/AccountStatus";
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa'
import {connect} from "react-redux";
import {closeNavSetting, openNavSetting, openReferer, togglePostATask} from "../store/modules/app";
import {loadUserDetails} from "../store/modules/auth";


class Bars extends Component<{}> {
    render() {
        const {showNavSetting, user, togglePostATask} = this.props;
        return <div className="min-vh-100 main-wrapper user-sidebar">
            <div className="w-100 text-center">
                <img alt="" src={user && user.avatar_url} style={{
                    width: 128, height: 128, borderRadius: 128, borderWidth: 2,
                    borderColor: "rgba(0,0,0,0.4)", borderStyle: "solid"
                }}/>
                <div className="my-3 fs-14">{user.first_name + ' ' + user.last_name}</div>
            </div>
            {
                showNavSetting ?
                    <div className="w-100 animated fadeIn ff-500 ">
                        <button onClick={this.props.closeNavSetting}
                           className="click-menu-item aligned w-100 btn-transparent">
                            <span className="text-primary"><FaArrowLeft class="mr-2 fs-12 text-black"/> Settings</span>
                        </button>
                        <NavLink to={"/account/profile"} className="menu-item w-100">
                            <span>Account</span>
                        </NavLink>
                        <NavLink to={"/account/skills"} className="menu-item w-100">
                            <span>Skills</span>
                        </NavLink>
                        {/*<NavLink to={"/account/alert"} className="menu-item w-100">*/}
                        {/*    <span>Task Alert</span>*/}
                        {/*</NavLink>*/}
                        <NavLink to={"/account/notifications"} className="menu-item w-100">
                            <span>Notification Settings</span>
                        </NavLink>
                        <NavLink to={"/account/mobile"} className="menu-item w-100">
                            <span>Mobile</span>
                        </NavLink>
                        <NavLink to={"/account/portfolio"} className="menu-item w-100">
                            <span>Portfolio</span>
                        </NavLink>
                        <NavLink to={"/account/password"} className="menu-item click w-100">
                            <span>Password</span>
                        </NavLink>
                    </div>
                    :
                    <div className="w-100  animated slideInUp ff-500" >
                        <NavLink to="/account" className="menu-item w-100">
                            <span>Dashboard</span>
                        </NavLink>
                        <button  onClick={togglePostATask} className="menu-item btn-transparent w-100">
                            <span>Post Task</span>
                        </button>
                        {/*<NavLink to={"/payment-history/"} className="menu-item w-100">*/}
                        {/*    <span>Payment History</span>*/}
                        {/*</NavLink>*/}
                        {/*<NavLink to={"/payment-method/"} className="menu-item w-100">*/}
                        {/*    <span>Payment Method</span>*/}
                        {/*</NavLink>*/}
                        <NavLink to={"/notifications"} className="menu-item w-100">
                            <span>Notifications</span>
                        </NavLink>

                        {/*<a href="./#" onClick={this.props.openReferer}*/}
                        {/*   className="click-menu-item spaced w-100">*/}
                        {/*    <span>Refer a Friend</span>*/}
                        {/*</a>*/}

                        <button onClick={this.props.openNavSetting}
                                className="click-menu-item spaced btn-transparent aligned w-100">
                            <span>Settings</span>
                            <FaArrowRight class="text-black"/>
                        </button>
                    </div>
            }

        </div>;
    }
}

const NavBars = connect(({Application: {showNavSetting}, User: user}) => ({showNavSetting, user}), {
    openNavSetting, openReferer, closeNavSetting,togglePostATask
})(Bars);

class UserLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {showPostTaskModal: false};
    }

    componentDidMount(): void {
        if (this.props.onRef) {
            this.props.onRef(this);
        }
        this.props.loadUserDetails();
    }


    componentDidUpdate(e) {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.mainContent.scrollTop = 0;
    }

    ref = () => this;

    render() {
        const {noSidebar, transparent, bgWhite,showPostTask, renderExtraNav} = this.props;
        return (
            <main className={styles.main}>
                <div className={styles.mainContainer} ref="mainContent">
                    <Loader/>
                    <AccountStatus/>
                    <UserHeader extraNav={renderExtraNav} light={this.props.light}/>
                    {showPostTask &&<PostTask  />}

                    <NewUser/>
                    <div className={`vw-100 d-flex ${bgWhite && 'bg-white'}`}>
                        <div className={`w-1024 d-flex mx-auto max-vh-100 pt-5 mt-2 ${!transparent && 'bg-white'}`}>
                            {!noSidebar && <NavBars/>}
                            <div className="flex-fill main-wrapper h-100"  style={{flex:1}}>
                                {this.props.children || this.props.render || null}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

// const mapStateToProps = ({Auth, User, Application}) => ({});

export default connect(({Application: {showPostTask}, User: user}) =>
    ({showPostTask}), {loadUserDetails, togglePostATask})(UserLayout);
