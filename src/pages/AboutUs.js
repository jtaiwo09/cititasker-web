import React, {Component} from "react";

import Layout from "../components/Layout";
import Faq from "./tasker/Faq";

class About extends Component {
    render() {
        return (
            <Layout>
                <div className="about">
                    <div className="about-intro hero">
                        <div className="content home intro row">
                            <div className="intro-container">
                                <h1 className="intro-2 quote1 text-white inline-block">
                                    We are here to make people’s lives better
                                </h1>
                                <h4 className="intro-3  text-white quote2">Creating a way to
                                    connect people ready to work, with people who need work done
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="about-vision">
                        <div className="content"><h3 className="title">What is CitiTasker</h3>
                            <div className="text">
                                <p className="fs-15">
                                    CitiTasker is a trusted community marketplace that connects people and businesses
                                    who need to outsource tasks and find local services, with people who are looking to
                                    earn money and ready to work.
                                    <br/>
                                    <br/>
                                    Time is our most precious, non-renewable resource. By helping people to handle their
                                    tasks and to-dos that take up their time, we are giving them the time and headspace
                                    to be their best and be more productive.
                                    <br/>
                                    <br/>
                                    With CitiTasker, you can complete your home cleaning, furniture assembly, house
                                    painting, photography, graphic design, web development or other jobs you might need
                                    help with.
                                    Everyday life is made easy with CitiTasker. You hire service providers; we keep them
                                    accountable.
                                    Don’t just take our word for it, sign up to see how Taskers are saving the day for
                                    people like you.
                                    CitiTasker. Get to-dos done.
                                    <br/><br/><b>Our Proposition</b> <br/>
                                    Connect collaborate and get tasks done in a secure and flexible way.
                                    <br/> <br/> <b>Our Value System</b> <br/>
                                    Trust; Nurturing a sense of confidence and transparency through verification and
                                    secure payment system.
                                    Respect; Having due regard for people’s feelings, wishes, or rights and identifying
                                    their individual needs.
                                    Accountability; Encouraging being responsible for what you do and able to give a
                                    satisfactory reason for it to ensure members have pleasant experiences.
                                    Integrity; Uphold the quality of being honest and having strong moral principles in
                                    all that we do.

                                    {/*    Cititasker is a trusted community platform that connects people who*/}
                                    {/*    need to outsource tasks and find local services, with people who are looking to earn*/}
                                    {/*money and ready to work.<br/><br/>From simple to complicated tasks, Cititasker can help*/}
                                    {/*you*/}
                                    {/*complete your home cleaning, handyman jobs, admin work, photography, graphic design*/}
                                    {/*or even build a website.<br/><br/>Go online or download the app and Cititasker will*/}
                                    {/*take you from 'things to do' to 'everything's done'.<br/><br/>Cititasker. Get More*/}
                                    {/*Done.*/}
                                </p>
                            </div>
                            <div className="quote">
                                <p>“To build a global network of local service marketplace. ”</p>
                                <p>“To connect people ready to work with people who need work done. ”</p>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="statistics d-flex spaced text-center  mx-auto">
                            <div className="statistic"><p>Over</p><p className="huge number-of-users">1.6M</p><p
                                className="larger">People using Cititasker</p></div>
                            <div className="statistic"><p>Over</p><p className="huge jobs-created">$215M</p><p
                                className="larger">Worth of jobs created</p></div>
                            <div className="statistic"><p>Over</p><p
                                className="huge jobs-available-per-month">$15.40M</p><p
                                className="larger">Jobs available per month</p></div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    {/*<div className="about-video">*/}
                    {/*    <div className="content"><h3 className="title">What our clients say</h3><p>We connect local*/}
                    {/*        people ready to work, with people who need work to be done.</p>*/}
                    {/*        <div id="video-container">*/}
                    {/*            <video id="video" poster="/images/about/videos/VideoPoster.jpg">*/}
                    {/*                <source*/}
                    {/*                    src="https://s3-ap-southeast-2.amazonaws.com/assets-airtasker-com/uploads/about/Cititasker_Interview_1.ogv"*/}
                    {/*                    type="video/ogv"/>*/}
                    {/*                <source*/}
                    {/*                    src="https://s3-ap-southeast-2.amazonaws.com/assets-airtasker-com/uploads/about/Cititasker_Interview_1.mp4"*/}
                    {/*                    type="video/mp4"/>*/}
                    {/*            </video>*/}
                    {/*            <div id="video-controls">*/}
                    {/*                <button id="play-pause" type="button"></button>*/}
                    {/*                <button id="full-screen" type="button"></button>*/}
                    {/*            </div>*/}
                    {/*            <div id="video-overlay"></div>*/}
                    {/*        </div>*/}
                    {/*        <div className="link-container"><a href="https://www.youtube.com/user/Cititasker"*/}
                    {/*                                           target="_blank" rel="noopener noreferrer"*/}
                    {/*                                           className="button-min button-sml specialjoc">See more*/}
                    {/*            videos</a></div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="social-proof">*/}
                    {/*    <div className="content center">*/}
                    {/*        <a href="https://www.airtasker.com/blog/"><img alt="Forbes"*/}
                    {/*                                                                                   src="/images/about/clients/forbes.png"*/}
                    {/*                                                                                   srcSet="/images/about/clients/forbes.png 1x, /images/about/clients/forbes@2x.png 2x"/></a><a*/}
                    {/*        href="https://www.airtasker.com/blog/"><img alt="Sydney Morning Herald"*/}
                    {/*                                                    src="/images/about/clients/smh.png"*/}
                    {/*                                                    srcSet="/images/about/clients/smh.png 1x, /images/about/clients/smh@2x.png 2x"/></a><a*/}
                    {/*        href="https://www.airtasker.com/blog/"><img alt="Today"*/}
                    {/*                                                    src="/images/about/clients/today.png"*/}
                    {/*                                                    srcSet="/images/about/clients/today.png 1x, /images/about/clients/today@2x.png 2x"/></a><a*/}
                    {/*        href="https://www.airtasker.com/blog/"><img alt="The Guardian"*/}
                    {/*                                                    src="/images/about/clients/the-guardian.png"*/}
                    {/*                                                    srcSet="/images/about/clients/the-guardian.png 1x, /images/about/clients/the-guardian@2x.png 2x"/></a><a*/}
                    {/*        href="https://www.airtasker.com/blog/"><img alt="CNET" src="/images/about/clients/cnet.png"*/}
                    {/*                                                    srcSet="/images/about/clients/cnet.png 1x, /images/about/clients/cnet@2x.png 2x"/></a><a*/}
                    {/*        href="https://www.airtasker.com/blog/"><img alt="Financial Review"*/}
                    {/*                                                    src="/images/about/clients/financial-review.png"*/}
                    {/*                                                    srcSet="/images/about/clients/financial-review.png 1x, /images/about/clients/financial-review@2x.png 2x"/></a><a*/}
                    {/*        href="https://www.airtasker.com/blog/"><img alt="The Next Web"*/}
                    {/*                                                    src="/images/about/clients/tnw.png"*/}
                    {/*                                                    srcSet="/images/about/clients/tnw.png 1x, /images/about/clients/tnw@2x.png 2x"/></a><a*/}
                    {/*        href="https://www.airtasker.com/blog/"><img alt="BBC" src="/images/about/clients/bbc.png"*/}
                    {/*                                                    srcSet="/images/about/clients/bbc.png 1x, /images/about/clients/bbc@2x.png 2x"/></a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <Faq/>
                </div>
            </Layout>
        );
    }
}

export default About;
