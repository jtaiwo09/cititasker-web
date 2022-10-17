import React, {Component} from "react";
import UserLayout from "../../layouts/UserLayout";


class Portfolio extends Component<{}> {
    state = {
        current: '',
        new_passord: '',
        confirm: ''
    }

    render() {
        return (
            <UserLayout>
                <div className=" user-profile ff-500  fs-14">
                    <div
                        className="px-4 d-sm-flex border-bottom d-block justify-content-sm-between align-items-sm-center">
                        <h5>Portfolio</h5>

                    </div>
                    <div className="p-4 w-100">

                        <div className="row mt-3">
                            <div className="col-sm-10 ">
                                <h3>Upload your resume</h3>
                                <div>
                                    Adding your resume can definitely help members understand your skills and
                                    qualifications.
                                </div>
                                <div className="mt-2">
                                    File formats can be PDF/DOC/TXT/RTF and no larger than 5MB.
                                </div>
                                <div>
                                    <button type="button"
                                            className="btn-outline-secondary btn-sm mt-2 fw-700 ff-700  btn btn-round">
                                        Select Resume
                                    </button>
                                </div>

                                <h3 className="mt-4">Upload portfolio items</h3>
                                <div>
                                    Showcase your talents by adding items to your portfolio (visible on your profile).
                                    This
                                    is particularly great for photographers, designers and illustrators, but also great
                                    for
                                    a gallery to advertise you completing tasks.
                                </div>
                                <div className="mt-2">
                                    You may upload a maximum of 30 items. File formats can be JPG/PNG/PDF/TXT and must
                                    be no
                                    larger than 5MB. For your own security and privacy, please make sure you don't
                                    upload
                                    any personal details in your attachments.
                                </div>
                                <div>
                                    <button type="button"
                                            className="btn-outline-secondary btn-sm mt-2 fw-700 ff-700  btn btn-round">
                                        Select file(s)
                                    </button>
                                </div>

                                <div className="clearfix"/>
                            </div>
                        </div>
                    </div>
                </div>
            </UserLayout>
        );
    }
}

export default Portfolio;
