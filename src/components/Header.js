import React from 'react'
import { NavLink } from "react-router-dom";
import { FaBars, FaPlus, FaTimes } from "react-icons/fa";
import {connect} from "react-redux";
import {togglePostATask} from "../store/modules/app";

let sticky = 0;

class Header extends React.Component {
    state = {
        openMenu: false,
        btnClicked: false
    };

    toggleMenu = () => {
        this.setState({ openMenu: !this.state.openMenu })
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
        if (document.body.scrollTop > sticky) {
            header.classList.add("sticky-header", "text-black");
        } else {
            if (this.props.light)
                header.classList.remove("sticky-header", "text-black");
        }
    };

    render() {
        const { openMenu } = this.state;
        const { togglePostATask } = this.props;
        return (
            <nav
                className={`navbar  navbar-expand-lg home-header navbar-light p-0 fixed-top ${!this.props.light &&
                    'text-black sticky-header '}`}
                id="mainNav">
                <div className="header-container">
                    <div className="header-left-container-1">
                        <div className="header-left-container ">
                            <button className="mobile-button mobile-menu btn-transparent"
                                style={{ fontSize: 20 }}
                                onClick={this.toggleMenu}>
                                {openMenu ? <FaTimes className={'animated fadeIn slow '} /> :
                                    <FaBars className={'animated fadeIn slow'} />}
                            </button>
                            <NavLink
                                className={openMenu ? 'animated slideOutUp  mobile-button ' :
                                    'animated   mobile-button slideInDown  mr-lg-4 '}
                                to="/">
                                <img src="/images/logo/medium-color.png" className="logo" alt="CitiTasker Logo" />
                            </NavLink>

                            <NavLink
                                className={'animated slideInDown  mr-4 web-button'}
                                to="/">
                                <img src="/images/logo/medium-color.png" className="logo" alt="CitiTasker Logo" />
                            </NavLink>

                            <button
                                onClick={togglePostATask}
                                className={`animated btn btn-danger btn-round post-btn  mobile-button  ${openMenu ?
                                    ' text slideInRight ' : ' post-btn-icon p-0 slideInLeft'}`}>
                                <span className="web-button " style={{ fontSize: 11 }}>Post Task</span>
                                <span className="mobile-button" style={{ fontSize: 11 }}> {openMenu ? 'Post Task ' :
                                    <FaPlus style={{ fontSize: 16 }} />}</span>
                            </button>

                            <button
                                onClick={togglePostATask}
                                className={`animated btn btn-danger btn-round post-btn web-button  slideInLeft`}>
                                <span className="web-button " style={{ fontSize: 11 }}>
                                    Post Task
                                </span>
                            </button>
                        </div>
                        <div className={openMenu ? "header-right-container show mobile-width-100"
                            : "header-right-container"}
                            id="navbarResponsive">
                            <div className="navbar-nav">
                                <NavLink className="auth-btn mobile-button mt-3" to="/">Home</NavLink>
                                <NavLink className="auth-btn mobile-button mt-3" to="/login">Log in</NavLink>
                                <NavLink className="auth-btn mobile-button" to="/register">Register</NavLink>
                                <NavLink className="auth-btn mobile-button" to="/join">Become A Tasker</NavLink>
                                <NavLink className="auth-btn" to={'/browse-task'}>Browse Tasks</NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="header-right-container web-button animated slideInRight">
                        <div className="ml-auto d-flex align-items-center">

                            <NavLink className="auth-btn" to="/login">Log in</NavLink>
                            <NavLink className="auth-btn" to="/register">Register</NavLink>
                            <NavLink className="tasker-btn ff-500 web-button" to="/join">
                                <span> Become a Tasker</span>
                            </NavLink>

                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}
export default connect(({Application: {showPostTask},  User: user}) => ({showPostTask}), {togglePostATask})(Header);

