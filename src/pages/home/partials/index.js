import { FaPlay, FaSprayCan, FaStar } from 'react-icons/fa';
import { Naira, catchError } from "../../../utils";
import React, { Component, useState } from "react";

import { AppService } from "../../../services";
import ModalVideo from "react-modal-video";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import styles from './style.module.scss';
// import {createBrowserHistory} from 'history'
import { toast } from 'react-toastify';
import { togglePostATask } from "../../../store/modules/app";

// const history = createBrowserHistory();

export class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [], lat: 6.5244, lng: 3.3792, index: 0
        }
    }

    componentDidMount(): void {
        AppService.allTask().then(({ data }) => {
            this.setState({ listData: data.data || [] })
        }).catch(catchError);
    }

    render() {
        const { listData } = this.state
        return (
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h2>See What Others Are Getting Done</h2>
                    {/* <div className={styles.tabs}>
                        <span onClick={() => this.setState({index: 0})} className={index === 0 && styles.active}>Cake Baking</span>
                        <span onClick={() => this.setState({index: 1})} className={index === 1 && styles.active}>Starting a business</span>
                        <span onClick={() => this.setState({index: 2})} className={index === 2 && styles.active}>Fixing stuff</span>
                        <span onClick={() => this.setState({index: 3})} className={index === 3 && styles.active}>Hosting a party</span>
                        <span onClick={() => this.setState({index: 4})} className={index === 4 && styles.active}>Something different</span>
                    </div> */}
                    {/* <div className={styles.tabDescription}>
                        <p>
                           Got a few boxes to shift, an apartment
                            or entire house? Get your home moved just the way you want, by whom you want, when you want.
                            Let Cititasker shoulder the load. 
                           When life gets busy, you don’t have to tackle it alone
                        </p>
                    </div> */}
                </div>

                <div className={styles.jobListWrapper}>
                    <div className="marquee-1">
                        {
                            listData.map((task, key) =>
                                <JobCard
                                    key={key}
                                    slug={task.slug}
                                    avatar={task.user.avatar_url}
                                    description={task.description}
                                    category={task.title}
                                    price={Naira + task.price}
                                />
                            )
                        }
                    </div>
                    <div className="marquee-1 marquee-2">
                        {
                            listData.map((task, key) =>
                                <JobCard
                                    key={key}
                                    slug={task.slug}
                                    avatar={task.user.avatar_url}
                                    description={task.description}
                                    category={task.title}
                                    price={Naira + task.price}
                                />
                            )
                        }
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.tabDescription}>
                        <p>When life gets busy, you don’t have to tackle it alone</p>
                    </div>
                    <div className="d-flex">
                        <NavLink to="/register" className="btn btn-round btn-danger ml-auto mr-auto">Get started
                        now
                        </NavLink>
                    </div>
                </div>
            </div>
        )

    }
}

function _TaskButton(props) {
    if (props.icon) {
        return (<div onClick={() => props.togglePostATask(props.title)} className={"task-cat"}>
            <img alt="..." src={props.icon} />
            <p className={"text-center small mt-1"}>{props.title}</p>
        </div>)
    }

    return <div className={"task-cat"}>
        <button className={"task-cat-btn btn-transparent"}>
            <FaSprayCan />
        </button>
        <p className={"text-center small"}>{props.title}</p>
    </div>;
}
export const TaskButton = connect(null, { togglePostATask })(_TaskButton)

export function JobCard(props) {
    return (
        <NavLink to={'/task/' + props.slug}>
            <div className={styles.jobCard}>
                <div className={styles.cat}>
                    <p>{props.category}</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <div className={styles.jobDes}>
                        <img alt="" src={props.avatar} className="avatar" />
                        <p className={styles.description}>
                            {props.description}
                        </p>
                    </div>
                    <p className={styles.price}>{props.price}</p>
                </div>
                <div className={styles.star}>
                    <FaStar />
                    <span>5 Stars</span>
                </div>
            </div>
        </NavLink>
    )

}


export class Banner extends Component {
    state = { query: '' }
    processForm = (e) => {
        e.preventDefault();
        if (this.state.query.length > 3) {
            return this.props.history.replace('/browse-task?filter=' + this.state.query)
        }
        return toast.warning('Search query must be at list 3 characters', {
            // position: toast.POSITION.BOTTOM_LEFT
        })
    }

    render() {
        return (
            <>
                <div className="banner">
                    <div className="row-overlay video-overlay" />
                    <div className="banner-content">
                        <div className="col-lg-6 mt-5  px-0 pt-5">
                            <p className="my-3">
                                The best person for the job isn't always who you think
                            </p>
                            <form id="search" onSubmit={this.processForm}>
                                <div className="input-group mb-3">
                                    <input
                                        type="text" className="form-control"
                                        placeholder="Try &quot;building mobile app&quot;"
                                        aria-label="Recipient's username"
                                        aria-describedby="button-addon2"
                                        value={this.state.query}
                                        onChange={event => this.setState({ query: event.target.value })}
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="submit" id="button-addon2">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export class Banner2 extends Component {
    state = { query: '', isOpen: false }
    processForm = (e) => {
        e.preventDefault();
        if (this.state.query.length > 3) {
            return this.props.history.replace('/browse-task?filter=' + this.state.query)
        }
        return toast.warning('Search query must be at list 3 characters', {
            // position: toast.POSITION.BOTTOM_LEFT
        })
    }

    render() {
        return (
            <>
                <section className="bg-img banner-2 full-screen cover-background top-position1 p-0 left-overlay">
                    <div className="container d-flex flex-column py-10 py-sm-8 py-md-0">
                        <div className="row align-items-center min-vh-100">
                            <div className="col-12">
                                <div className="row align-items-center">
                                    <div className="col-lg-8 mb-5 mb-lg-0">
                                        <h1 className="text-primary">Cititasker</h1>
                                        <h2 className="text-white display-16 display-md-9 display-lg-7 display-xl-4 mb-1-6 font-weight-700 text-shadow">
                                            Connect with experts to get the job done on Cititasker.
                                        </h2>
                                        <p className="mb-2-2 w-95 w-md-75 display-29 display-md-28 text-white">
                                            It's amazing what you can't do yourself
                                        </p>
                                        <NavLink to="/login" className="btn btn-primary btn-round white-hover">
                                            get started now
                                        </NavLink>
                                    </div>
                                    <div className="col-lg-4 text-left text-lg-center">
                                        <ModalVideo
                                            channel='youtube'
                                            isOpen={this.state.isOpen}
                                            videoId='CrrnNVnlvc8'
                                            onClose={() => this.setState({ isOpen: false })}
                                        />
                                        <button
                                            className="popup-social-video video_btn small"
                                            onClick={() => this.setState({ isOpen: true })}>
                                            <FaPlay />
                                        </button>
                                        {/*<a className="popup-social-video video_btn small"*/}
                                        {/*   href="https://www.youtube.com/watch?v=CrrnNVnlvc8">*/}
                                        {/*    <FaPlay/>*/}
                                        {/*</a>*/}
                                        <div
                                            className="d-inline-block align-middle pl-5 text-white text-left font-weight-600">Watch<span
                                                className="text-uppercase d-block">intro video</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export class TaskButtonRow extends Component {
    render() {
        return (
            <div className="task-cat-wrapper py-5">
                <h3>What do you need done?</h3>
                <div className='task-cat-row'>
                    <TaskButton icon="/images/svg/cleaning.svg" title={"Cleaning"} />
                    <TaskButton icon="/images/svg/cake-baking.svg" title={"Cake Baking"} />
                    <TaskButton icon={"/images/svg/digital-marketing.svg"} title={"Digital Marketing"} />
                    <TaskButton icon="/images/svg/gardening.svg" title={"Gardening"} />
                    <TaskButton icon="/images/svg/furniture.svg" title={"Assembling"} />
                    <TaskButton icon="/images/svg/cargo.svg" title={"Moving"} />
                    <TaskButton icon="/images/svg/photography.svg" title={"Photography"} />
                    <TaskButton icon="/images/svg/handyman.svg" title={"Others"} />
                    {/*<TaskButton title={"Office Cleansing"}/>*/}
                    {/*<TaskButton title={"church Cleansing"}/>*/}
                    {/*<TaskButton title={"Pope Cleansing"}/>*/}
                    {/*<TaskButton title={"Handyman"}/>*/}
                    {/*<TaskButton title={"Marketing & Design"}/>*/}
                    {/*<TaskButton title={"church Cleansing"}/>*/}
                    {/*<TaskButton title={"church Cleansing"}/>*/}
                </div>
            </div>
        );
    }
}


const HowItWorksCard = ({ title, description, image }) => <div className="col-md-4">
    <div className="d-flex align-items-center">
        <img alt="" src={image} style={{ width: 100, height: 100 }} />
        <div className="text-left">
            <h3 className={styles.hwTitle}>{title}</h3>
            <p className={styles.hwDes}>{description}</p>
        </div>
    </div>
</div>;

export class HowItWorks extends Component {
    render() {
        return (
            <section className="text-center py-5 my-5">
                <h3 className="mt-3 fs-24">How does Cititasker work?</h3>
                <p className="my-3 ml-auto mr-auto col-6">
                    Check out the video below to see exactly how Cititasker can help you get those to-dos done once and
                    for all.
                </p>
                <div className="my-2 col-sm-9 ml-auto mr-auto">
                    <img alt="" src="https://airtasker.com/images/homepage/home-video-player.jpg"
                        style={{ width: '100%', height: '100%', borderRadius: 8 }} />
                    <button className={styles.playBtn}>Play Video</button>
                </div>

                <div className=" my-2 col-sm-9 ml-auto mr-auto">
                    <div className="row">
                        <HowItWorksCard
                            image={'https://airtasker.com/images/homepage/home-how-it-works-step-image-1.png'}
                            title={'Post your Task'}
                            description={'Tell us what you need. It\'s FREE to post'}
                        />
                        <HowItWorksCard
                            image={'https://www.airtasker.com/images/homepage/home-how-it-works-step-image-2.png'}
                            title={'Review offers'}
                            description={'Get offers from trusted Taskers and view profiles.'}
                        />
                        <HowItWorksCard
                            image={'https://airtasker.com/images/homepage/home-how-it-works-step-image-3.png'}
                            title={'Get it done'}
                            description={'Choose the right person for your task and get it done.'}
                        />
                    </div>
                </div>
            </section>
        );
    }
}

export class Taskers extends Component {
    render() {
        return (
            <section className="text-center py-5 my-5">
                <h3 className="mt-3">How does Cititasker work?</h3>
                <p className="my-3 ml-auto mr-auto col-9">
                    Check out the video below to see exactly how Cititasker can help you get those to-dos done once and
                    for all.
                </p>
                <div className="col-lg-8 my-2 col-sm-12 ml-auto mr-auto">
                    <img alt="" src="https://airtasker.com/images/homepage/home-video-player.jpg"
                        style={{ width: '100%', height: '100%', borderRadius: 8 }} />
                    <button className={styles.playBtn}>Play Video</button>
                </div>

                <div className="col-lg-8 my-2 col-sm-12 ml-auto mr-auto">
                    <div className="row">
                        <HowItWorksCard
                            image={'https://airtasker.com/images/homepage/home-how-it-works-step-image-1.png'}
                            title={'Post your Task'}
                            description={'Tell us what you need. It\'s FREE to post'}
                        />
                        <HowItWorksCard
                            image={'https://www.airtasker.com/images/homepage/home-how-it-works-step-image-2.png'}
                            title={'Review offers'}
                            description={'Get offers from trusted Taskers and view profiles.'}
                        />
                        <HowItWorksCard
                            image={'https://airtasker.com/images/homepage/home-how-it-works-step-image-3.png'}
                            title={'Get it done'}
                            description={'Choose the right person for your task and get it done.'}
                        />
                    </div>
                </div>
            </section>
        );
    }
}


export class HomeContainer extends Component {
    render() {
        return (
            <div className="col-sm-12">
                <div className="home-things home-spacing homepage__StyledHomePageValues-sc-1eh5ylh-2 gysOBD">
                    <div className="grid home-wrapper-narrow">
                        <div className="grid__column grid__column--span-1" />
                        <div className="grid__column grid__column--span-10">
                            <h3 className=" ">Things you might also want to know</h3>
                            <p className="Text__StyledTypographyComponent-sc-35e02v-0 AqsGZ">
                                Whether you’re getting work done or doing tasks on Cititasker,
                                know that we’ve got your back every step of the way.
                            </p>
                        </div>
                        <div className="grid__column grid__column--span-1" />
                    </div>
                    <div className="grid home-wrapper-narrow">
                        <div className="grid__column grid__column--span-2" />
                        <div className="grid__column grid__column--span-8">
                            <div className="home-things-group-container">
                                <div className="home-things-group first-div">
                                    <div className="home-things-image home-things-one"
                                        style={{ transform: 'translate(0px, 0px)' }}>
                                        <div className="home-things-one-device-left"
                                            style={{ transform: 'rotate(17deg)' }} />
                                        <div className="home-things-one-device-right"
                                            style={{ transform: 'rotate(-20deg)' }} />
                                        <div className="home-things-one-padlock"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-one-light home-things-one-light-1"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-one-light home-things-one-light-2"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-one-light home-things-one-light-3"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }}
                                        />
                                    </div>
                                </div>
                                <div className="home-things-group second-div"><h4>Secure Payments</h4><p>We hold task
                                payments secure with our PCI-DSS compliant Cititasker Pay – so tasks can be completed
                                    knowing payment is there when you're done.</p><a
                                        href="https://support.airtasker.com/hc/en-au/categories/200049939-Payments"
                                        target="_blank" rel="noopener noreferrer">Read more</a></div>
                            </div>
                        </div>
                        <div className="grid__column grid__column--span-2" />
                    </div>
                    <div className="grid home-wrapper-narrow">
                        <div className="grid__column grid__column--span-2" />
                        <div className="grid__column grid__column--span-8">
                            <div className="home-things-group-container">
                                <div className="home-things-group second-div"><h4>Top rated insurance</h4><p>Insurance
                                is there to ease any worries - making sure the Tasker has liability insurance from
                                    CGU while performing most task activities. T&amp;C's apply.</p>
                                    {/*<a target="_blank" href="/insurance/">Read more</a>*/}
                                </div>
                                <div className="home-things-group first-div">
                                    <div
                                        className="home-things-image home-thing-image-water home-things-four home-things-four-colour"
                                        style={{ transform: 'translate(0px, 0px)' }}>
                                        <div className="home-things-four-buooi"
                                            style={{ transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-four-wave"
                                            style={{ clip: 'rect(0px, 148px, 21px, 0px)' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid__column grid__column--span-2" />
                    </div>
                    <div className="grid home-wrapper-narrow">
                        <div className="grid__column grid__column--span-2" />
                        <div className="grid__column grid__column--span-8">
                            <div className="home-things-group-container">
                                <div className="home-things-group first-div">
                                    <div className="home-things-image home-thing-image-free home-things-two"
                                        style={{ transform: 'translate(0px, 0px)' }}>
                                        <div className="home-things-two-badge home-thing-two-badge-id"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-two-badge home-thing-two-badge-coles"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-two-badge home-thing-two-badge-card"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-two-badge home-thing-two-badge-empty-0"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-two-badge home-thing-two-badge-facebook"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-two-badge home-thing-two-badge-twitter"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-two-badge home-thing-two-badge-police"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-two-badge home-thing-two-badge-removals"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-two-badge home-thing-two-badge-child"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-two-badge home-thing-two-badge-paint"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-two-badge home-thing-two-badge-electrician"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-two-badge home-thing-two-badge-ikea"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-two-badge home-thing-two-badge-empty-1"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-two-badge home-thing-two-badge-empty-2"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-two-badge home-thing-two-badge-empty-3"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                        <div className="home-things-two-badge home-thing-two-badge-empty-4"
                                            style={{ opacity: 1, transform: 'translate(0px, 0px)' }} />
                                    </div>
                                </div>
                                <div className="home-things-group second-div"><h4>Verified badges</h4><p>Badges give
                                members a bit more verified info when deciding who to work with on a task. Each
                                badge has certain requirements that must be met and verified before they’re shown on
                                    the member's profile.</p><a href="https://www.airtasker.com/blog/airtasker-badges/"
                                        target="_blank" rel="noopener noreferrer">Read more</a>
                                </div>
                            </div>
                        </div>
                        <div className="grid__column grid__column--span-2" />
                    </div>
                    <div className="grid home-wrapper-narrow">
                        <div className="grid__column grid__column--span-2" />
                        <div className="grid__column grid__column--span-8">
                            <div className="home-things-group-container">
                                <div className="home-things-group second-div"><h4>Here if you need us</h4><p>Our
                                comprehensive Help Centre and dedicated Cititasker Support are on hand 24/7 to help
                                    with any questions, queries or issues you might have.</p><a
                                        href="https://support.airtasker.com/hc/en-au" target="_blank"
                                        rel="noopener noreferrer">Read more</a></div>
                                <div className="home-things-group first-div">
                                    <div className="home-things-image home-things-three"
                                        style={{ transform: "scale(0, 0)" }}>
                                        <div className="home-things-three-dude"
                                            style={{ transform: "translate(-193.5px, 175.5px) rotate(45deg)" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid__column grid__column--span-2" />
                    </div>
                </div>
            </div>
        );
    }
}

export const SomeTasker = () => {
    const taskers = [{
        name: "LEAH SAMUEL",
        specialities: "Event planning, Interior decoration",
        sg: "Fashion designing As a single mother, Leah had to find something that could be flexible and cover the cost of childcare.Trust",
        stars: 4,
        image: 'images/taskers/1.jpg',
        review: '4.79 stars from 241 reviews',
        testimonia: 'Leah has done an excellent job of instant geyser installation & his customer service and after-work service is awesome',
        t_name: 'Femi Johnson'
    }]
    const [tasker, setTasker] = useState(taskers[0].name);
    return (
        <div className="my-4">
            <div className="row">
                <div className="col-sm-10 mx-auto text-center">
                    <h2 className="">Meet some Taskers!</h2>
                    <p className="col-sm-6 mx-auto">
                        Meet some of our Taskers that are making the CitiTasker community great, how and why they do
                        what they do.
                    </p>
                </div>

                <div className="col-sm-12">
                    <div className="app-tabs central ">
                        {taskers.map(({ name, }) =>
                            <span
                                key={name}
                                onClick={() => setTasker(name)}
                                className={tasker === name ? 'active' : ''}>
                                {name}
                            </span>)}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-8 mx-md-auto box-shadow card p-0 mx-2rem">
                    <div className="some-tasker">
                        <div className="profile-avatar">
                            <img
                                src={taskers[0].image}
                                alt="Tasker profile" />
                        </div>
                        <div className="profile-details">
                            <div className="">
                                <h4 className="fs-24 fw-900">{tasker}</h4>
                                <p className="home-taskers-carousel-featured-skill">
                                    {taskers[0].specialities}
                                </p>
                            </div>
                            <div className="home-taskers-carousel-contents-text">
                                <p>
                                    {taskers[0].sg}
                                </p>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="">
                                        <h5>Trust</h5>
                                        <div className="aligned">
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                        </div>
                                        <p>4.9 stars from 185 reviews</p>
                                    </div>
                                    <div className="">
                                        <h5>What the reviews say</h5>
                                        <p>{taskers[0].testimonia}</p>
                                        <p className="">{taskers[0].t_name}</p>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div>
                                        {/*<h5>Badges</h5>*/}
                                        {/*<div>*/}
                                        {/*    <div className="d-flex aligned">*/}
                                        {/*        <div className="badge">*/}
                                        {/*            <img*/}
                                        {/*                src="https://www.airtasker.com/images/homepage/badge-id.png"*/}
                                        {/*                alt="Digital iD badge"/>*/}
                                        {/*        </div>*/}
                                        {/*        <span>Digital iD</span>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div>*/}
                                        {/*    <div className="d-flex aligned">*/}
                                        {/*        <div className="badge">*/}
                                        {/*            <img*/}
                                        {/*                src="https://www.airtasker.com//images/homepage/badge-police.png"*/}
                                        {/*                alt="Police check badge"/>*/}
                                        {/*        </div>*/}
                                        {/*        <span>Police check</span>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div>*/}
                                        {/*    <div className="d-flex aligned">*/}
                                        {/*        <div className="badge">*/}
                                        {/*            <img src="https://www.airtasker.com/images/homepage/badge-ikea.png"*/}
                                        {/*                 alt="IKEA badge"/>*/}
                                        {/*        </div>*/}
                                        {/*        <span>IKEA</span>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<a href="./#"*/}
                                        {/*   target="_blank" rel="noopener noreferrer">Learn more</a></div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center my-5 col-sm-12">
                    <a className="btn btn-round btn-primary" target="_blank" href="/earn-money/">
                        Become a Tasker
                    </a>
                </div>
            </div>
        </div>
    )
};


export class MigthKnow extends Component {
    render() {
        return (
            <div className="home-things home-spacing">
                <div className="row">
                    <div className="col-sm-10 mx-auto text-center">
                        <h2 color="#292b32" className="fs-40  ">Things you might also want to know</h2>
                        <p color="#545a77" className="Text__StyledTypographyComponent-vkkwwf-0 kDgyCM">
                            Whether you’re getting work done or doing tasks on Cititasker,
                            know that we’ve got your back every step of the way.
                        </p>
                    </div>
                </div>

                <div className="row get-started-block justified aligned flex-sm-row flex-column d-sm-flex">
                    <div className="">
                        <div className="img-container step-1">
                            <img alt="Browse Tasks"
                                src="https://www.airtasker.com/images/earn-money/1-Browse-tasks.png" />
                        </div>
                    </div>
                    <div className="text-left col-2 ml-0 ml-sm-6 flex-sm-fill">
                        <div className="display-table-cell mx-auto">
                            <h3 className="text-primary fs-24">Browse tasks</h3>
                            <p className="fs-14">
                                Search for tasks nearby that match your skill set by using filtering for
                                location, distance, completing in-person vs. remotely, and by searching
                                keywords. When you find the right task, make an offer!
                            </p>
                            <a href="/tasks/">Start browsing tasks</a>
                        </div>
                    </div>
                </div>


                <div className="row get-started-block justified flex-sm-row flex-column d-sm-flex">
                    <div className="order-1 order-sm-2 mr-0 mr-sm-6">
                        <div className="img-container step-2">
                            <img alt="Make an offer"
                                src="https://www.airtasker.com/images/earn-money/2-Make-offer.png" />
                        </div>
                    </div>
                    <div className="order-2 order-sm-1 col-2 mr-sm-4 display-table flex-sm-fill  text-left">
                        <div className="display-table-cell">
                            <h3 className="text-primary fs-24">Make an offer</h3>
                            <p className="fs-14">It’s
                            important to make sure your offer is at a fair price, taking into account how
                            long
                            it could take and what skills are needed. This could well be higher or lower
                            than
                                the task price. Just make sure you let the Poster know why in your offer.</p>
                        </div>
                    </div>
                </div>


                <div className="row get-started-block justified flex-sm-row flex-column d-sm-flex">
                    <div className="ml-0 ml-sm-6">
                        <div className="img-container step-3">
                            <img alt="Do the task well and get paid"
                                src="https://www.airtasker.com/images/earn-money/3-Do-task.png" />
                        </div>
                    </div>
                    <div className="text-left col-2 ml-0 ml-sm-6 flex-sm-fill w-sm-100">
                        <div className="display-table-cell">
                            <h3 className="text-primary fs-24">
                                Do the task well and get paid
                            </h3>
                            <p className="fs-14">
                                Keep talking to the Poster regularly so that they know what's happening.
                                When it's done, make sure you request for the payment to be released and leave
                                an
                                honest and true review for the Poster.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row get-started-block justified flex-sm-row flex-column d-sm-flex">
                    <div className="order-1 order-sm-2 mr-0 mr-sm-6">
                        <div className="img-container step-4">
                            <img alt="Improve your profile"
                                src="https://www.airtasker.com/images/earn-money/4-Profile.png"
                            />
                        </div>
                    </div>
                    <div
                        className="order-2 order-sm-1 col-2 mr-0 mr-sm-4 text-left flex-sm-fill">
                        <div className="display-table-cell">
                            <h3 className="fs-24 text-primary">Improve your profile</h3>
                            <p className="fs-14">
                                Posters will look at your profile and reviews so you've got to make a good first
                                impression! Upload a photo, write a nice description, and list the skills you're
                                great at. An awesome profile instantly improves your chances of your offers
                                getting accepted.
                            </p>
                            <a href="/account/dashboard/">View profile</a>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

export class WhyChooseUs extends Component {
    render() {
        return (
            <div className="home-things  home-spacing">
                <div className="row">
                    <div className="col-sm-10 mx-auto text-center">
                        <h2 color="#292b32" className="fs-40  ">Why you should choose CitiTasker</h2>
                        <p color="#545a77">
                            Whether you’re getting work done or doing tasks on Cititasker, know that we’ve got your back
                            every step of the way.
                        </p>
                    </div>
                </div>

                <div className="row get-started-block justified aligned flex-sm-row flex-column d-sm-flex">
                    <div className="">
                        <div className="img-container step-1">
                            <img alt="Pay safely" className="why-choose"
                                src="images/content/browse-tasks.png" />
                        </div>
                    </div>
                    <div className="text-left col-2 ml-0 ml-sm-6 flex-sm-fill">
                        <div className="display-table-cell mx-auto">
                            <h3 className="text-primary fs-24">Pay safely</h3>
                            <p className="fs-14">
                                Pay easily, with peace of mind. We hold payments secure in CitiTasker pay escrow account
                                until task has been completed and you’re 100% satisfied.
                            </p>
                            <NavLink to="/browse-tasks">Start browsing tasks</NavLink>
                        </div>
                    </div>
                </div>


                <div className="row get-started-block justified flex-sm-row flex-column d-sm-flex">
                    <div className="order-1 order-sm-2 ml-sm-5 mr-sm-auto">
                        <div className="img-container step-2">
                            <img alt="Top Rated Insurance" className="why-choose"
                                src="images/content/make-offer.png" />
                        </div>
                    </div>
                    <div className="order-2 order-sm-1 col-2 how-2 display-table flex-sm-fill  text-left">
                        <div className="display-table-cell">
                            <h3 className="text-primary fs-24">Top Rated Insurance</h3>
                            <p className="fs-14">
                                CitiTasker insurance covers the Taskers for their liability to the third parties for
                                personal injury or property damage while performing most task activities. T&C apply.
                            </p>
                        </div>
                    </div>
                </div>


                <div className="row get-started-block justified flex-sm-row flex-column d-sm-flex">
                    <div className="mr-sm-5 ml-sm-auto">
                        <div className="img-container step-3">
                            <img alt="Do the task well and get paid" className="why-choose"
                                src="images/content/help-line.png" />
                        </div>
                    </div>
                    <div className="text-left col-2 how-1 flex-sm-fill w-sm-100">
                        <div className="display-table-cell">
                            <h3 className="text-primary fs-24">
                                Here to help
                            </h3>
                            <p className="fs-14">
                                Our Help Centre and dedicated CitiTasker Support specialist are on hand 24/7 to help you
                                navigate our tools and get the most out our website. You can count on them to work with
                                you in a timely manner to resolve any issues that might arise - swiftly and promptly.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row get-started-block justified flex-sm-row flex-column d-sm-flex">
                    <div className="order-1 order-sm-2 ml-0 mr-0 mr-sm-auto ">
                        <div className="img-container step-4">
                            <img alt="Verified Taskers" className="why-choose"
                                src="images/content/verified.png"
                            />
                        </div>
                    </div>
                    <div className="order-2 order-sm-1 col-2 how-2 text-left flex-sm-fill">
                        <div className="display-table-cell">
                            <h3 className="fs-24 text-primary">Verified Taskers</h3>
                            <p className="fs-14">
                                Verified Tasker gets badge to give posters more info when deciding who to assign a task.
                                Each badge has certain requirements that must be met and vetted before they’re shown on
                                Tasker’s profile.
                            </p>
                            {/*<a href="/account/dashboard/">View profile</a>*/}
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}
