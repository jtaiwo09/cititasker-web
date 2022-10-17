import React, {useEffect} from 'react'
import Header from "./Header";
import UserHeader from "./UserHeader";
import Footer from "./Footer";
import PostTask from "./Modals/PostATask";
// import ReviewTask from "./Modals/ReviewTask";
import Auth from '../utils/AuthenticationHandler'
import AccountStatus from "./Modals/AccountStatus";
import EditOffer from "./Modals/EditOffer";
import {useLocation} from "react-router-dom";
import {connect} from "react-redux";
import {togglePostATask} from "../store/modules/app";

function Layout(props) {
    const {pathname} = useLocation()
    const {noFooter,showPostTask} = props;
    useEffect(() => {
        // window.scrollTo(0, 0)
        const child = document.getElementById('child')
        child.scrollTop = 0
        child.scrollIntoView()
        child.focus({preventScroll: false})
    }, [pathname])

    return (
        <div>
            {
                Auth.isAuthenticated() ?
                    <UserHeader home/> :
                    <Header light={props.light}/>
            }
            {showPostTask &&<PostTask  />}
            <AccountStatus/>
            <EditOffer/>
            <div id="child" className={props.className} style={{paddingTop: props.banner ? 0 : 80}}>
                {props.children}
            </div>
            {!noFooter && <Footer/>}
        </div>
    )
}

export default  connect(({Application: {showPostTask}, User: user}) =>
    ({showPostTask}), {togglePostATask})(Layout);;
