import React, {Component} from "react";
import {TaskButton} from "../home/partials";
import {BsCalendar} from "react-icons/bs";
import UserLayout from "../../layouts/UserLayout";
import {connect} from "react-redux";
import {togglePostATask} from "../../store/modules/app";


class UserDashboard extends Component<{}> {
    render() {
        return <UserLayout>
            <div className="px-3">
                <h1>Dashboard</h1>
                <p className="pb-0 mb-2">Get your to-dos done today</p>
                <small>To-do list never get shorter. Take the burden off and find the help you need
                    on CitiTasker.
                </small>


                <h3 className="text-left mt-4">Book now & consider the job done</h3>
                <span
                    className="mb-3">Arrange & pay for a top-rated Tasker in just a few clicks</span>

                <h5 className="mt-5 px-2">Home Cleaning</h5>
                <div className="row px-3">
                    <div onClick={this.props.togglePostATask} className="new-post">
                        <img
                            alt="..."
                            src="/images/banners/dashboard1.jpeg"
                        />
                        {/*<div className="text-white mt--4  p-2 mx-3 ">$ 700</div>*/}
                        <div className="px-3 mt-1">
                            <div><span className="font-weight-700 fs-16">Home in</span></div>
                            <span><BsCalendar/>&nbsp;Choose a time & day</span>
                        </div>
                    </div>

                    <div onClick={this.props.togglePostATask} className="new-post">
                        <img alt="..." src="/images/banners/dashboard2.jpeg"/>
                        {/*<div className="text-white mt--4  p-2 mx-3 ">$ 700</div>*/}
                        <div className="px-3 mt-1">
                            <div><span className="font-weight-700 fs-16">Home in</span></div>
                            <span><BsCalendar/>&nbsp;Choose a time & day</span>
                        </div>
                    </div>
                </div>


                <h5 className="mt-3 px-2">Grocery shopping & delivery</h5>
                <div className="row px-3">
                    <div onClick={this.props.togglePostATask} className="new-post">
                        <img alt="..." src="/images/banners/dashboard3.jpg"/>
                        {/*<div className="text-white mt--4  p-2 mx-3 ">$ 700</div>*/}
                        <div className="px-3 mt-1">
                            <div><span className="font-weight-700 fs-16">Home in</span></div>
                            <span><BsCalendar/>&nbsp;Choose a time & day</span>
                        </div>
                    </div>

                    <div onClick={this.props.togglePostATask} className="new-post">
                        <img alt="..." src="/images/banners/dashboard4.jpg"/>
                        {/*<div className="text-white mt--4  p-2 mx-3 ">$ 700</div>*/}
                        <div className="px-3 mt-1">
                            <div><span className="font-weight-700 fs-16">Home in</span></div>
                            <span><BsCalendar/>&nbsp;Choose a time & day</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-3">
                <div className="py-5">
                    <h3>Post a task & get offers </h3>
                    <small>Receive & review offers from Taskers who can help</small>
                    <div className='task-cat-row'>
                        <TaskButton icon="/images/svg/cleaning.svg" title={"Cleaning"}/>
                        <TaskButton icon="/images/svg/cake-baking.svg" title={"Cake Baking"}/>
                        <TaskButton icon={"/images/svg/digital-marketing.svg"} title={"Digital Marketing"}/>
                        <TaskButton icon="/images/svg/gardening.svg" title={"Gardening"}/>
                        <TaskButton icon="/images/svg/furniture.svg" title={"Assembling"}/>
                        <TaskButton icon="/images/svg/cargo.svg" title={"Moving"}/>
                        <TaskButton icon="/images/svg/photography.svg" title={"Photography"}/>
                        <TaskButton icon="/images/svg/handyman.svg" title={"Others"}/>
                    </div>
                </div>
            </div>
        </UserLayout>;
    }
}

export default connect(null, {togglePostATask})(UserDashboard);
