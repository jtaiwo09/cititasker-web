import React, { Component } from "react";

import { FaStar } from 'react-icons/fa';
import ModalVideo from "react-modal-video";
import { NavLink } from "react-router-dom";
import styles from './style.module.scss';

export function JobCard(props) {
    return (
        <a
            href="https://www.airtasker.com/tasks/move-boxes-and-pushbike-from-kew-to-sydney-8936153/"
            target="_blank" rel="noopener noreferrer">
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
                    <p className={styles.price}>${props.price}</p>
                </div>
                <div className={styles.star}>
                    <FaStar />
                    <span>5 Stars</span>
                </div>
            </div>
        </a>
    )

}

export class Banner extends Component {
    render() {
        return (
            <div className="join-banner ">
                <div className=" container">
                    <div style={{ position: 'relative', }} className="row  aligned">
                        <div className="web-button">
                            <img alt="Tasker" src="/images/banners/2.jpg" />
                        </div>
                        <div style={{ position: 'absolute', left: 0, marginLeft: 50 }} className="col-sm-5 pull-sm-right">
                            <h4 className="fs-36 fw-700 ff-700 text-white">
                                Earn up to #500,000 a month on CitiTasker by helping people with their everyday to-dos.
                            </h4>
                            <div className="mb-2">
                                <NavLink to="/register"  className="btn btn-round btn-success text-white">Join Cititasker</NavLink>
                            </div>
                            {/* <small>
                                Based on the median top 50 Tasker's monthly earnings.
                        </small> */}
                        </div>
                    </div>
                    <div className="clearfix" />
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
    state = { isOpen: false }

    render() {
        return (
            <section className="text-center py-5 my-5">
                <h3 className="mt-3">How does Cititasker work?</h3>
                <p className="my-3 ml-auto mr-auto col-9">
                    It’s easy to get work done on CitiTasker. Check out the video below to see exactly
                    how CitiTasker can help you get your tasks from “to-do” to “done”.
                    Post your tasks for FREE; Tell us what you need and start receiving offers in minutes.
                </p>
                <div className="col-lg-8 my-2 col-sm-12 ml-auto mr-auto">
                    <ModalVideo
                        channel='youtube'
                        isOpen={this.state.isOpen}
                        videoId='CrrnNVnlvc8'
                        onClose={() => this.setState({ isOpen: false })}
                    />
                    {/*<button*/}
                    {/*    className="popup-social-video video_btn small"*/}
                    {/*    >*/}
                    {/*    <FaPlay/>*/}
                    {/*</button>*/}

                    <img alt=""
                        src="https://airtasker.com/images/homepage/home-video-player.jpg"
                        style={{ width: '100%', height: '100%', borderRadius: 8 }} />
                    <button className={styles.playBtn} onClick={() => this.setState({ isOpen: true })}>Play Video</button>
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
                            title={'Offers come to you'}
                            description={'Get offers from trusted Taskers and assign the best tasker to the job by reviewing their profiles.'}
                        />
                        <HowItWorksCard
                            image={'https://airtasker.com/images/homepage/home-how-it-works-step-image-3.png'}
                            title={'Get it done'}
                            description={'Assign a tasker in one click. Choose by reviews, skills and price.'}
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

