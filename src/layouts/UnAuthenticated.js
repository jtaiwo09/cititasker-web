import React from "react";
import styles from "../assets/scss/user-layout.module.scss"
import PostTask from "../components/Modals/PostATask";
import UnAuthenticatedHeader from '../components/Headers/UnAuthenticatedHeader'
import UserHeader from "../components/UserHeader";
import Auth from '../utils/AuthenticationHandler'
import {connect} from "react-redux";
import {togglePostATask} from "../store/modules/app";
import AccountStatus from "../components/Modals/AccountStatus";


class UnAuthenticatedLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate(e) {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.mainContent.scrollTop = 0;
    }


    render() {
        const {transparent, sideBar, renderExtraNav, showPostTask} = this.props
        return (
            <main className={styles.mainUnauthenticated}>
                <div className={styles.mainContainer} ref="mainContent">
                    {
                        Auth.isAuthenticated() ?
                            <UserHeader extraNav={renderExtraNav} light={this.props.light}/> :
                            <UnAuthenticatedHeader light={this.props.light}/>
                    }
                    <AccountStatus/>
                    {showPostTask && <PostTask/>}
                    <div className="vw-100 d-flex  pt-lg-0 pt-5">
                        <div className={`w-1024 d-flex mx-auto min-vh-100 pt-5 ${!transparent && 'bg-white'}`}>
                            {
                                sideBar &&
                                <div className="min-vh-100 unauthenticated main-wrapper web-button no-border">
                                    {sideBar}
                                </div>
                            }
                            <div className=" flex-fill main-wrapper  ">
                                {this.props.children || this.props.render || null}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

export default connect(({Application: {showPostTask}, User: user}) =>
    ({showPostTask}), {togglePostATask})(UnAuthenticatedLayout);

