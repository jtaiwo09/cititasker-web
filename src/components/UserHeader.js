import React, {Component} from 'react'
import {NavLink, withRouter} from "react-router-dom";
import {FaArrowLeft, FaArrowRight, FaBars, FaPlus, FaTimes} from "react-icons/fa";
import {Dropdown, DropdownMenu, DropdownToggle} from "reactstrap";
import Auth from "../utils/AuthenticationHandler";
import {connect} from "react-redux";
import {closeNavSetting, closeReferer, openNavSetting, openReferer, togglePostATask} from "../store/modules/app";
import Spinner from "reactstrap/es/Spinner";


let sticky = 0;

class Bars extends Component<{}> {
    render() {
        const {showNavSetting, user, togglePostATask} = this.props;
        if (showNavSetting) {
            return (
                <div style={{zIndex: 99}} className="w-100 animated fadeIn mt--2 ">
                    <button onClick={this.props.closeNavSetting}
                            className="mobile-click-item btn-transparent aligned w-100">
                        <span className="text-primary"><FaArrowLeft class="mr-2 fs-12 text-black"/> Settings</span>
                    </button>
                    <NavLink to={"/users/" + user.uuid} className="profile-menu-item">
                        <span>Account</span>
                    </NavLink>
                    <NavLink to={"/account/profile"} className="profile-menu-item">
                        <span>Edit Account</span>
                    </NavLink>
                    <NavLink to={"/account/skills"} className="profile-menu-item">
                        <span>Skills</span>
                    </NavLink>
                    {/*<NavLink to={"/account/alert"} className="profile-menu-item">*/}
                    {/*    <span>Task Alert</span>*/}
                    {/*</NavLink>*/}
                    {/*<NavLink to={"/account/notifications"} className="profile-menu-item">*/}
                    {/*    <span>Notification Settings</span>*/}
                    {/*</NavLink>*/}
                    <NavLink to={"/account/mobile"} className="profile-menu-item">
                        <span>Mobile</span>
                    </NavLink>
                    <NavLink to={"/account/portfolio"} className="profile-menu-item">
                        <span>Portfolio</span>
                    </NavLink>
                    <NavLink to={"/account/password"} className="profile-menu-item">
                        <span>Password</span>
                    </NavLink>
                </div>

            );
        }
        return (
            <div style={{zIndex: 99}} className="w-100 animated slideInUp mt--2 bg-white">
                <div className="spaced p-3 " style={{width: 205}}>
                    <div>
                        <div><span className="fs-12 fw-bold">{user.first_name + ' ' + user.last_name}</span></div>
                        <div>
                            <small className="fs-10">Public Profile</small>
                        </div>
                    </div>
                </div>
                <NavLink to={"/account/"} className="profile-menu-item">
                    <span>Dashboard</span>
                </NavLink>
                <button onClick={() => togglePostATask('', '')} className="btn-transparent profile-menu-item">
                    <span>Post Task</span>
                </button>
                <NavLink to={"/browse-task/"} className="profile-menu-item">
                    <span>Browse Task</span>
                </NavLink>
                <NavLink to={"/my-task"} className="profile-menu-item">
                    <span>My Task</span>
                </NavLink>
                <NavLink to={"/message"} className="profile-menu-item">
                    <span>Message</span>
                </NavLink>
                <NavLink to={"/payment-history"} className="profile-menu-item">
                    <span>Payment History</span>
                </NavLink>
                <NavLink to={"/payment-method"} className="profile-menu-item">
                    <span>Payment Method</span>
                </NavLink>
                <div className="profile-menu-item">
                    <span>Notifications</span>
                </div>


                {/*<a href="./#" onClick={this.props.openReferer}*/}
                {/*   className="mobile-click-item aligned w-100">*/}
                {/*    <span>Refer a Friend</span>*/}
                {/*</a>*/}


                <button onClick={this.props.openNavSetting}
                        className="mobile-click-item btn-transparent aligned w-100">
                    <span className="text-primary">Settings</span>
                    <FaArrowRight class="mr-2 fs-12 text-black"/>
                </button>
                {/*<div className="profile-menu-item">*/}
                {/*    <span>Discover</span>*/}
                {/*</div>*/}
                {/*<div className="profile-menu-item">*/}
                {/*    <span>Help & Support</span>*/}
                {/*</div>*/}
                <NavLink to={"/logout"} onClick={Auth.logout} className="mobile-click-item">
                    <span>Logout</span>
                    <FaArrowRight class="mr-2 fs-12 text-black"/>
                </NavLink>
            </div>
        );
    }
}

const NavBar = connect(({Application: {showNavSetting}, User: user}) => ({showNavSetting, user}), {
    openNavSetting, openReferer, closeReferer,
    closeNavSetting, togglePostATask
})(Bars);

class MobileBar extends Component<{}> {

    render() {
        const {showNavSetting, user, togglePostATask} = this.props;
        if (showNavSetting) {
            return (
                <div className="mobile-button ff-500">
                    <button onClick={this.props.closeNavSetting}
                            className="mobile-nav-menu btn-transparent aligned w-100">
                        <span className="text-primary"><FaArrowLeft class="mr-2 fs-12 text-black"/> Settings</span>
                    </button>
                    <NavLink to={"/users/" + user.uuid} className="mobile-nav-menu">
                        <span>Account</span>
                    </NavLink>
                    <NavLink to={"/account/profile"} className="mobile-nav-menu">
                        <span>Edit Account</span>
                    </NavLink>
                    <NavLink to={"/account/skills"} className="mobile-nav-menu">
                        <span>Skills</span>
                    </NavLink>
                    {/*<NavLink to={"/account/alert"} className="mobile-nav-menu">*/}
                    {/*    <span>Task Alert</span>*/}
                    {/*</NavLink>*/}
                    {/*<NavLink to={"/account/notifications"} className="mobile-nav-menu">*/}
                    {/*    <span>Notification Settings</span>*/}
                    {/*</NavLink>*/}
                    <NavLink to={"/account/mobile"} className="mobile-nav-menu">
                        <span>Mobile</span>
                    </NavLink>
                    <NavLink to={"/account/portfolio"} className="mobile-nav-menu">
                        <span>Portfolio</span>
                    </NavLink>
                    <NavLink to={"/account/password"} className="mobile-nav-menu">
                        <span>Password</span>
                    </NavLink>
                </div>
            );
        }
        return (
            <div className="mobile-button ff-500">
                <div className="p-3 " style={{width: 205}}>
                    <div>
                        <div><span className="fs-14 fw-bold">{user.first_name + ' ' + user.last_name}</span></div>
                        <div>
                            <small className="fs-10">&nbsp;</small>
                        </div>
                    </div>
                </div>
                <div className="mobile-nav-menu">
                    <NavLink to={"/account"}>
                        <span>Dashboard</span>
                    </NavLink>
                </div>
                <div className="mobile-nav-menu">
                    <button className="btn-transparent" onClick={() => {
                        togglePostATask('', '');
                        this.props.history.push('/browse-task')
                    }}>
                        <span>Post Task</span>
                    </button>
                </div>
                <div className="mobile-nav-menu">
                    <NavLink to={"/browse-task"}>
                        <span>Browse Task</span>
                    </NavLink>
                </div>
                <div className="mobile-nav-menu">
                    <NavLink to={"/my-task"}>
                        <span>My Task</span>
                    </NavLink>
                </div>
                <div className="mobile-nav-menu">
                    <NavLink to={"/message"}>
                        <span>Message</span>
                    </NavLink>
                </div>
                <div className="mobile-nav-menu">
                    <NavLink to={"/payment-history"}>
                        <span>Payment History</span>
                    </NavLink>
                </div>
                <div className="mobile-nav-menu">
                    <NavLink to={"/payment-method"}>
                        <span>Payment Method</span>
                    </NavLink>
                </div>
                <div className="mobile-nav-menu">
                    <span>Notification</span>
                </div>

                {/*<a href="./#" onClick={this.props.openReferer}*/}
                {/*   className="mobile-nav-menu aligned w-100">*/}
                {/*    <span>Refer a Friend</span>*/}
                {/*</a>*/}

                <button onClick={this.props.openNavSetting}
                        className="mobile-nav-menu btn-transparent aligned w-100">
                    <span>Settings</span>
                    <FaArrowRight class="mr-2 fs-12 text-black"/>
                </button>

                {/*<div className="mobile-nav-menu">*/}
                {/*    <span>Discover</span>*/}
                {/*</div>*/}
                {/*<div className="mobile-nav-menu">*/}
                {/*    <span>Help & Support</span>*/}
                {/*</div>*/}
                <NavLink to="/logout" className="mobile-nav-menu aligned w-100">
                    <span>Logout</span>
                    <FaArrowRight class="mr-2 fs-12 text-black"/>
                </NavLink>

            </div>
        );
    }
}

const MobileNav = connect(({Application: {showNavSetting,}, User: user}) => ({showNavSetting, user}), {
    openNavSetting, openReferer, closeReferer,
    closeNavSetting, togglePostATask,
})(withRouter(MobileBar));


class UserHeader extends React.Component {
    state = {
        openMenu: false,
        btnClicked: false,
        profileMenu: false
    };

    toggleMenu = () => {
        this.setState({openMenu: !this.state.openMenu})
    };


    toggleProfileMenu = () => {
        this.setState({profileMenu: !this.state.profileMenu})
    };


    componentDidMount() {
        document.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll, true);
    }

    handleScroll = (event) => {
        const header = document.getElementById("mainNav");
        sticky = header.offsetHeight;
        if (document.body.scrollTop > sticky || document.body.scrollTop > sticky) {
            header.classList.add("sticky-header", "text-black");
        } else {
            if (this.props.light)
                header.classList.remove("sticky-header", "text-black");
        }
    };

    render() {
        const {openMenu} = this.state;
        const {togglePostATask, extraNav, user, showLoader} = this.props;
        return (
            <div className="bg-white ">
                <nav className="navbar  navbar-expand-lg navbar-dark  user-header sticky-header" id="mainNav">
                    {showLoader && <div className="spinner-float ">
                        <Spinner primary/>
                    </div>
                    }
                    <div className="header-container p-2 p-sm-0">
                        <div className="header-left-container-1">
                            <div className="header-left-container ">
                                <button className="mobile-button btn-transparent mobile-menu p-2"
                                        style={{fontSize: 20}}
                                        onClick={this.toggleMenu}>
                                    {openMenu ? <FaTimes className={'animated fadeIn slow '}/> :
                                        <FaBars className={'animated fadeIn slow'}/>}
                                </button>
                                <NavLink
                                    className={openMenu ? 'animated slideOutUp  mobile-button '
                                        : 'animated  mobile-button slideInDown  mr-lg-4 '}
                                    to="/account">
                                    <img src="/images/logo/medium-color.png" className="logo" alt="CitiTasker Logo"/>
                                </NavLink>

                                <NavLink
                                    className={'animated slideInDown  mr-4 web-button'}
                                    to="/account">
                                    <img src="/images/logo/medium-color.png" className="logo" alt="CitiTasker Logo"/>
                                </NavLink>

                                <div style={{width: 0.5, height: 57, background: 'rgba(0,0,0,0.1)'}}
                                     className="mr-3 ml-2 web-button"/>
                                <button
                                    onClick={togglePostATask}
                                    className={`animated btn btn-danger btn-round post-btn  mobile-button  ${openMenu ?
                                        ' text slideInRight ' : ' post-btn-icon p-0 slideInLeft'}`}>
                                    <span className="web-button " style={{fontSize: 11}}>Post Task</span>
                                    <span className="mobile-button" style={{fontSize: 11}}> {openMenu ? 'Post Task ' :
                                        <FaPlus style={{fontSize: 16}}/>}</span>
                                </button>

                                <button
                                    onClick={togglePostATask}
                                    className={`animated btn btn-danger btn-round post-btn web-button  slideInLeft`}>
                                    <span className="web-button " style={{fontSize: 11}}>
                                        Post a Task
                                </span>
                                </button>


                            </div>
                            <div className={openMenu ? "header-right-container show mobile-width-100"
                                : "header-right-container"}
                                 id="navbarResponsive">
                                <div className="navbar-nav p-0 ">
                                    <div className="web-button d-flex">
                                        <NavLink to={"/browse-task"} className="auth-btn">
                                            <span>Browse Task</span>
                                        </NavLink>
                                        <NavLink to={"/my-task"} className="auth-btn">
                                            <span>My Task</span>
                                        </NavLink>
                                    </div>

                                    <MobileNav/>
                                </div>
                            </div>
                        </div>
                        <div className="header-right-container  web-button animated slideInRight">
                            <div className="ml-auto d-flex align-items-center">
                                {/*<NavLink className="auth-btn" to="/help/">Help</NavLink>*/}
                                <NavLink className="auth-btn" to="/notifications">Notifications</NavLink>
                                <NavLink className="auth-btn" to={"/users/"+user.uuid}>Profile</NavLink>
                                <NavLink className="auth-btn" to={"/account/profile"}>Edit Profile</NavLink>
                                <Dropdown
                                    className="web-button ff-500 " isOpen={this.state.profileMenu}
                                    toggle={this.toggleProfileMenu}>
                                    <DropdownToggle
                                        tag="div"
                                        data-toggle="dropdown"
                                        aria-expanded={this.state.profileMenu}
                                    >
                                        <div className="ml-3" onClick={this.toggleProfileMenu}
                                             style={{cursor: 'pointer', width: 32, height: 32,}}>
                                            <img
                                                height={'100%'}
                                                width={'100%'}
                                                style={{borderRadius: 32,}}
                                                src={user.avatar_url}
                                                alt="user avatar"/>
                                        </div>
                                    </DropdownToggle>
                                    <DropdownMenu className="profile-menu">
                                        <NavBar/>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </nav>
                {extraNav && extraNav}
            </div>

        )
    }
}

export default connect(({Application: {showNavSetting, showLoader}, User: user}) => ({
    showNavSetting, showLoader, user
}), {togglePostATask})(UserHeader);
