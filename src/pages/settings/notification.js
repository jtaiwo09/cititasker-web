import React, {Component} from "react";
import UserLayout from "../../layouts/UserLayout";


class NotificatioonEdit extends Component<{}> {
    render() {
        return (
            <UserLayout>
                <div className=" user-profile ff-500  fs-14">
                    <div
                        className="px-4 d-sm-flex border-bottom d-block justify-content-sm-between align-items-sm-center">
                        <h5>Task alerts</h5>

                    </div>
                    <div className="p-4 w-100">
                        <div className="mb-3">
                            These are emails and push notifications about tasks you may be interested in.
                        </div>
                    </div>

                    <div className="p-3">
                        Turn on task alerts to get notified about tasks we think you’d like.
                    </div>
                </div>
            </UserLayout>
        );
    }
}

export default NotificatioonEdit;
