import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {toast} from 'react-toastify';
import Auth from "../utils/AuthenticationHandler";
import {isNull} from "../utils";
import {connect} from "react-redux";

class _AppRoute extends Component<{ component: any }> {
    getProfileProgess() {
        const {user} = this.props, checkers = Object.keys(user),
            except = ['created_at', 'updated_at', 'id', 'email_verified_at', 'user_id', 'userdetail', 'deleted_at'];
        let progress = 0;
        except.forEach(key => {
            if (checkers.includes(key)) {
                checkers.splice(checkers.indexOf(key), 1);
            }
        });
        checkers.forEach((key) => {
            if (!isNull(user[key])) {
                progress += (100 / checkers.length)
            }
        });
        return Math.round(progress, 0)
    }

    render() {
        let {component: Component, user, ...rest} = this.props;
        return (
            <Route
                {...rest}
                render={props => {
                    if (Auth.isAuthenticated()) {
                        if (user && user.is_verified === 0) {
                            toast('You need to verify your email');
                            return (<Redirect to={{pathname: "/account/not-verify", state: {from: props.location}}}/>);
                        }

                        // if (user && typeof(user) === 'object' &&
                        //     (this.getProfileProgess() < 40) && props.location.pathname !== '/account/profile') {
                        //     toast('You need to update your profile');
                        //     return (<Redirect to={{pathname: "/account/profile", state: {from: props.location}}}/>);
                        // }
                        return <Component {...props} />;
                    } else {
                        toast('You are not logged in');
                        localStorage.redirectBackto = props.location;
                        return (<Redirect to={{pathname: "/login", state: {from: props.location}}}/>);
                    }
                }}
            />
        );
    }
}

const mapStateToProps = ({Auth, User,}) => {
    return {...Auth, user: User}
};

export const AppRoute = connect(mapStateToProps, {})(_AppRoute);


export const GuestRoute = ({component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (!Auth.isAuthenticated()) {
                    return <Component {...props} />;
                } else {
                    return (<Redirect to={{pathname: "/account", state: {from: props.location}}}/>);
                }
            }}
        />
    );
};
