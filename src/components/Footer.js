import {FaFacebook, FaTwitter, FaYoutube} from "react-icons/fa";

import {NavLink} from "react-router-dom";
import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="content">
                    <div className="menu-hierarchy">
                        <div className="menu-folder dynamic">
                            <div className="menu-folder-control showing">
                                <button className="button btn-transparent" style={{fontSize: 14}}>Company</button>
                            </div>
                            <div className="menu-folder-items">
                                <NavLink className="button" to="/about-us">About us</NavLink>
                                <NavLink className="button" to="/terms">Term of Service</NavLink>
                                <NavLink className="button" to="/privacy">Privacy policy</NavLink>
                                {/*<NavLink className="button" to="/how-it-works">How it Works </NavLink>*/}
                            </div>
                        </div>
                        <div className="menu-folder dynamic">
                            <div className="menu-folder-control showing">
                                <button className="button btn-transparent">Existing Members</button>
                            </div>
                            <div className="menu-folder-items">
                                <button className="button btn-transparent " onClick={window.togglePostATask}>Post a task</button>
                                <NavLink className="button" to="/browse-task">Browse tasks</NavLink>
                                <NavLink to="login" className="button">Login</NavLink>
                                <a className="button btn-transparent" href="/support">Support centre</a>
                            </div>
                        </div>
                        <div className="menu-folder dynamic">
                            <div className="menu-folder-control showing">
                                <NavLink to="/browse-task?filter=popular" className="button">Popular Categories</NavLink>
                            </div>
                            <div className="menu-folder-items">
                                <NavLink className="button" to="/browse-task?filter=popular">All Services</NavLink>
                            </div>
                        </div>
                        <div className="menu-folder dynamic">
                            <div className="menu-folder-control showing">
                                <a href={'./#'} className="button">Partners</a>
                            </div>
                            <div className="menu-folder-items">
                                <a className="button" target="_blank" rel="noopener noreferrer"
                                   href="https://google.com">Google</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-links small row">
                        <div className="app-stores nine columns">
                            {/*<a className="inline-block"*/}
                            {/*   rel="noopener noreferrer"*/}
                            {/*   target="_blank"*/}
                            {/*   href="https://play.google.com/store/apps/details?id=au.com.airtasker">*/}
                            {/*    <img alt="image" src="/images/google-pay.svg" alt="Google play"/>*/}
                            {/*</a>*/}
                            {/*<a className="inline-block"*/}
                            {/*   rel="noopener noreferrer"*/}
                            {/*   target="_blank"*/}
                            {/*   href="https://itunes.apple.com/au/app/airtasker/id512137061?mt=8">*/}
                            {/*    <img alt="image" src="apple-store.svg" alt="Apple store"/>*/}
                            {/*</a>*/}
                            <div className="social inline-block">
                                <a target="_blank"
                                   rel="noopener noreferrer"
                                   href="https://www.facebook.com/Cititasker/">
                                    <FaFacebook/>

                                </a>
                                <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/cititasker">
                                    <FaTwitter/>
                                </a>
                                <a target="_blank" rel="noopener noreferrer"
                                   href="https://www.youtube.com/user/Cititasker">
                                    <FaYoutube/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;
