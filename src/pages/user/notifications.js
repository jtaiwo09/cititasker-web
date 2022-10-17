import React, {Component} from "react";
import UserLayout from "../../layouts/UserLayout";
import {AppService} from "../../services";
import {catchError} from "../../utils";
import Spinner from "reactstrap/es/Spinner";
// import {NavLink} from "react-router-dom";

class Notifications extends Component {
    state = {
        notifications: []
    };

    componentDidMount() {
        this.setState({isLoading: true,})
        AppService.getUserNotifications().then(({data}) => {
            this.setState({notifications: data});
        }).catch(catchError).finally(() => this.setState({isLoading: false}));
    }

    renderView() {
        const {notifications, isLoading} = this.state;

        if (isLoading) {
            return (
                <div
                    className="px-3 text-center w-100 d-flex justify-content-center align-items-center min-vh-100 vh-100">
                    <Spinner/>
                </div>
            )
        }

        if (notifications.length) {
            return (
                <div className="px-3 min-vh-100 w-100">
                    <h1>Notifications</h1>
                    <hr className="m-0 p-0"/>
                    <div className="col-sm-9 mt-4">
                        <div className="timeline-container  position-relative ps ps--active-y">
                            <ul className="timeline">
                                {notifications.map(({data, created_at}) => {
                                        return (
                                            <li className="timeline-item">
                                                <div className="timeline-header-container">
                                                    <div className="timeline-icon bg-soft-primary">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                             viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                             stroke-width="2" stroke-linecap="round"
                                                             stroke-linejoin="round"
                                                             className="feather feather-command text-primary">
                                                            <path
                                                                d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                                                        </svg>
                                                    </div>
                                                    <div className="timeline-header">
                                                        <a   href={data.action || '#'}  className="fs-16 fw-bold">
                                                            <strong>{data.subject || 'Alert'}</strong>
                                                        </a>
                                                        <span>{created_at}</span>
                                                    </div>
                                                </div>
                                                <div className="timeline-content">
                                                    {data.message}
                                                </div>
                                                <div className="timeline-sub-content">
                                                    {data.data}
                                                </div>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                            <div className="ps__rail-x" style={{left: 0, bottom: 0}}>
                                <div className="ps__thumb-x" tabIndex="0" style={{left: 0, width: 0}}/>
                            </div>
                            <div className="ps__rail-y" style={{top: 0, height: 400, right: 0}}>
                                <div className="ps__thumb-y" tabIndex="0"
                                     style={{top: 0, height: 250}}/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }


        return (
            <div className="px-3 text-center min-vh-100 w-100">
                <img src="/images/empty-list.png" alt="no message" className="mx-auto" style={{width: 300}}/>
                <p className="pb-0 mb-2">No Notification Yet</p>
            </div>
        )

    }

    render() {
        return (
            <UserLayout>
                {this.renderView()}
            </UserLayout>
        );
    }
}

export default Notifications;
