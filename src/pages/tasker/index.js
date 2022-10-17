import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {Banner} from "./partials";
import Layout from "../../components/Layout";
import Faq from "./Faq";

class Home extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <Layout className="bg-white">
                <Banner/>
                <div className="col-sm-10 mx-auto py-4 ">
                    <div className="row text-center mt-5 fs-12 ff-900">
                        <div className="col-sm-4">
                            {/*<GiTie className="text-primary fs-60"/>*/}
                            <img alt="" src="images/content/make-offer.png" width={60}/>

                            <p className="text-primary mt-2 fs-24">Work your way</p>
                            <p className="m-0 p-2">
                                We believe the future of work is centered around freedom. Freedom to choose how you
                                work, where you work and the task you would like to complete for the people you’re happy
                                to work with.
                            </p>
                        </div>
                        <div className="col-sm-4">
                            {/*<AiOutlinePayCircle className="text-primary fs-60"/>*/}
                            <img alt="" src="images/content/secure-payment.png" width={60}/>

                            <p className="text-primary mt-2 fs-24">Get paid</p>
                            <p className="m-0 p-2">
                                Taskers feel confident to get started on completing a task straightaway knowing that
                                payment is secured through CitiTasker Payment protection. A Service Fee is automatically
                                included to cover variable insurance and transaction costs.
                            </p>
                        </div>
                        <div className="col-sm-4">
                            {/*<GiReceiveMoney className="text-primary fs-60"/>*/}
                            <img alt="" src="images/content/insurance.png" width={60}/>

                            <p className="text-primary mt-2 fs-24">Insurance Covered</p>
                            <p className="m-0 p-2 ">
                                CitiTasker insurance covers Taskers liability to the third parties for personal injury
                                or property damage while performing most task activities (T&C apply) – so you can work
                                with your mind at rest.
                            </p>
                        </div>
                        <p className="text-center col-sm-12 mt-5 ">
                            <small>
                                Terms and Conditions apply. Included Task activities only. Excesses apply for
                                Taskers.<a href="/insurance/">Learn more about Cititasker Insurance</a>
                            </small>
                        </p>
                    </div>
                </div>
                <div className="text-center mx-auto col-md-10 my-5">
                    <div className="w-100">
                        <h3 className="mb-3 fs-24">How to start earning</h3>

                        <div className="row get-started-block aligned d-block d-sm-flex">
                            <div className=" ml-0 ml-sm-6">
                                <div className="img-container step-1">
                                    <img alt="Browse Tasks" width={325}
                                         src="images/content/browse-tasks.png"/>
                                </div>
                            </div>
                            <div className="text-left col-2 ml-0 ml-sm-6 flex-sm-fill">
                                <div className="display-table-cell">
                                    <h3 className="text-primary fs-24">Browse tasks</h3>
                                    <p className="fs-14">
                                        Search for tasks that match the skills and services in your profile by using
                                        filtering for location, distance, completing in-person vs remotely, and by
                                        searching keywords. When you find the right task, make an offer.
                                    </p>
                                    <NavLink to="/tasks/">Start browsing tasks</NavLink>
                                </div>
                            </div>
                        </div>


                        <div className="row get-started-block d-block d-sm-flex">
                            <div className="order-1 order-sm-2 mr-0 mr-sm-6">
                                <div className="img-container step-2">
                                    <img alt="Make an offer" width={325}
                                         src="images/content/make-offer.png"/>
                                </div>
                            </div>
                            <div
                                className="order-2 order-sm-1 col-2 ml-auto  mr-0 mr-sm-4 display-table flex-sm-fill  text-left">
                                <div className="display-table-cell">
                                    <h3 className="text-primary fs-24">Make an offer</h3>
                                    <p className="fs-14">Get hired at the price you choose. It’s important to make your
                                        offer at a fair price. This could be higher or lower than the task price. just
                                        make sure you give your reason why in your offer.</p>
                                </div>
                            </div>
                        </div>

                        <div className="row get-started-block d-block d-sm-flex">
                            <div className="ml-0 ml-sm-6">
                                <div className="img-container step-3">
                                    <img alt="Do the task well and get paid" width={325}
                                         src="images/content/get-paid.png"/>
                                </div>
                            </div>
                            <div className="text-left col-2 ml-0 ml-sm-6 flex-sm-fill w-sm-100">
                                <div className="display-table-cell">
                                    <h3 className="text-primary fs-24">
                                        Get paid on time
                                    </h3>
                                    <p className="fs-14">
                                        We hold payments secure in CitiTasker pay escrow account until task is
                                        completed. When it’s done, make sure you raise invoice for the payment to be
                                        released. and leave an honest and true review for the poster.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="row get-started-block d-block d-sm-flex">
                            <div className="order-1 order-sm-2 mr-0 mr-sm-6">
                                <div className="img-container step-4">
                                    <img alt="Improve your profile" width={325}
                                         src="images/content/build-your-profile.png"
                                    />
                                </div>
                            </div>
                            <div
                                className="order-2 order-sm-1 col-2 mobile-full-width ml-auto mr-0 mr-sm-4 text-left flex-sm-fill">
                                <div className="display-table-cell">
                                    <h3 className="fs-24 text-primary">Build your profile</h3>
                                    <p className="fs-14">
                                        Upload a photo, describe the services you offer, showcase your portfolios and
                                        include other details that will make your profile stand out from other taskers.
                                        An outstanding profile enhances the chances of your offers getting accepted.
                                    </p>
                                    <NavLink to="/account">View profile</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Faq/>
            </Layout>
        );
    }
}

export default Home;
