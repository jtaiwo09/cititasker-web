import React, {Component} from "react";
import Layout from "../components/Layout";

class Dashboard extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <Layout>
                <div id="how-it-works">
                    <div className="hero">
                        <div className="hero-container content"><h2 className="center"><span>The best place for people and businesses</span><br/><span>to outsource tasks</span>
                        </h2>
                            <div className="how-it-works-video-btn">
                                <div className="image-wrapper">
                                    <img alt="" src="/images/how_it_works/how-it-works-screenshot.png"/>
                                </div>
                                <p>See how it works</p></div>
                            <div className="phase phase-1 center">
                                <div className="animation-box">
                                    <div className="animation-origin">
                                        <img alt="" src="/images/how_it_works/phase-1.png"
                                             srcSet="/images/how_it_works/phase-1.png 1x, /images/how_it_works/phase-1@2x.png 2x"
                                             className="main-img"/>
                                        <span className="bubble"/>
                                        <span className="bubble"/>
                                        <span className="bubble"/>
                                        <span className="bubble"/>
                                        <span className="bubble"/></div>
                                </div>
                                <div className="text-box center"><h4>What do you need done?</h4><p>Start by telling us
                                    about your task. Mention when and where (in person or online) you need it done, then
                                    suggest a fair budget for the task. Post any task you need from cleaning to web
                                    design in only two minutes – for free! There's no obligation to hire.</p></div>
                            </div>
                            <div className="phase phase-2 center">
                                <div className="animation-box">
                                    <div className="airtaskers">
                                        <img alt="" src="/images/how_it_works/phase-2-1.png"
                                             srcSet="/images/how_it_works/phase-2-1.png 1x, /images/how_it_works/phase-2-1@2x.png 2x"/><img
                                        alt="" src="/images/how_it_works/phase-2-2.png"
                                        srcSet="/images/how_it_works/phase-2-2.png 1x, /images/how_it_works/phase-2-2@2x.png 2x"/><img
                                        alt="" src="/images/how_it_works/phase-2-3.png"
                                        srcSet="/images/how_it_works/phase-2-3.png 1x, /images/how_it_works/phase-2-3@2x.png 2x"/><img
                                        alt="" src="/images/how_it_works/phase-2-4.png"
                                        srcSet="/images/how_it_works/phase-2-4.png 1x, /images/how_it_works/phase-2-4@2x.png 2x"/>
                                    </div>
                                </div>
                                <div className="text-box center"><h4>Choose the best person for you</h4><p>Take a look
                                    at profiles and reviews to pick the best Tasker for your task. When you accept an
                                    offer, your payment is held securely with Cititasker Pay until the task is complete.
                                    Now you can message and call the Tasker to sort out the details.</p></div>
                            </div>
                            <div className="phase phase-3 center">
                                <div className="animation-box">
                                    <img alt="" src="/images/how_it_works/phase-3-1.png"
                                         srcSet="/images/how_it_works/phase-3-1.png 1x, /images/how_it_works/phase-3-1@2x.png 2x"
                                         className="main-img"/><img alt=""
                                                                    src="/images/how_it_works/phase-3-2.png"
                                                                    srcSet="/images/how_it_works/phase-3-2.png 1x, /images/how_it_works/phase-3-2@2x.png 2x"
                                                                    className="main-img"/><img
                                    alt="" src="/images/how_it_works/phase-3-3.png"
                                    srcSet="/images/how_it_works/phase-3-3.png 1x, /images/how_it_works/phase-3-3@2x.png 2x"/>

                                    <div className="star-container"><span className="star"></span><span
                                        className="star"></span><span className="star"></span><span
                                        className="star"></span><span className="star"></span></div>
                                </div>
                                <div className="text-box center"><h4>Task completed</h4><p>With your task complete, you
                                    just need to release the payment held with Cititasker Pay. Then you’re free to leave
                                    a review for the Tasker so everyone can know what a great job they’ve done!</p>
                                </div>
                            </div>
                            <div id="how-it-works-menu" className="submenu">
                                <div id="mobile-header"><span>Menu</span><span className="menu-arrow"></span></div>
                                <div className="inner"><a href="#browse-tasks"
                                                          className="button-sml button-white-border subNavBtn">Post your
                                    task</a><a href="#insurance" className="button-sml button-white-border subNavBtn">Customer
                                    support</a><a href="#profiles"
                                                  className="button-sml button-white-border subNavBtn">Rating &amp; reviews</a><a
                                    href="#private-coms"
                                    className="button-sml button-white-border subNavBtn">Communication</a><a
                                    href="#payments" className="button-sml button-white-border subNavBtn">Cititasker
                                    Pay</a><a href="#apps" className="button-sml button-white-border subNavBtn">Apps</a><a
                                    href="#earn-money" className="button-sml button-cta earn-money-btn">Earn money</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="browse-tasks" data-header-watch="" className="task-suggestion">
                        <div className="content center">
                            <img alt="" src="/images/how_it_works/post-task.png"
                                 srcSet="/images/how_it_works/post-task.png 1x, /images/how_it_works/post-task@2x.png 2x"/>
                            <h3 className="blue">Post your task</h3><p className="centred center">Want your home cleaned
                            or furniture put together? Just tell us about the task you’d like done, suggest a fair
                            budget for a job well done and you’ll start to receive offers from available Taskers.</p>
                            {/*<div className="container-inner">*/}
                            {/*    <div className="task tall"><a href="/cooking/">*/}
                            {/*        <img alt=""*/}
                            {/*             src="/images/how_it_works/home-gardening.jpg"*/}
                            {/*             srcSet="/images/how_it_works/home-gardening.jpg 1x, /images/how_it_works/home-gardening@2x.jpg 2x"/>*/}
                            {/*        <div className="details">*/}
                            {/*            <div className="title">Cooking</div>*/}
                            {/*        </div>*/}
                            {/*    </a></div>*/}
                            {/*    <div className="multi-level">*/}
                            {/*        <div className="task"><a href="/computers/"><img alt=""*/}
                            {/*                                                         src="/images/how_it_works/it-comp.jpg"*/}
                            {/*                                                         srcSet="/images/how_it_works/it-comp.jpg 1x, /images/how_it_works/it-comp@2x.jpg 2x"/>*/}
                            {/*            <div className="details">*/}
                            {/*                <div className="title">Computer and IT</div>*/}
                            {/*            </div>*/}
                            {/*        </a></div>*/}
                            {/*        <div className="task"><a href="/photography/"><img alt=""*/}
                            {/*                                                           src="/images/how_it_works/event.jpg"*/}
                            {/*                                                           srcSet="/images/how_it_works/event.jpg 1x, /images/how_it_works/event@2x.jpg 2x"/>*/}
                            {/*            <div className="details">*/}
                            {/*                <div className="title">Photography</div>*/}
                            {/*            </div>*/}
                            {/*        </a></div>*/}
                            {/*        <div className="task wide"><a href="/handyman/"><img alt=""*/}
                            {/*                                                             src="/images/how_it_works/fun-quirky.jpg"*/}
                            {/*                                                             srcSet="/images/how_it_works/fun-quirky.jpg 1x, /images/how_it_works/fun-quirky@2x.jpg 2x"/>*/}
                            {/*            <div className="details">*/}
                            {/*                <div className="title">Handyman</div>*/}
                            {/*            </div>*/}
                            {/*        </a></div>*/}
                            {/*    </div>*/}
                            {/*    <div className="task tall edge"><a href="/removals/"><img alt=""*/}
                            {/*                                                              src="/images/how_it_works/delivery-removal.jpg"*/}
                            {/*                                                              srcSet="/images/how_it_works/delivery-removal.jpg 1x, /images/how_it_works/delivery-removal@2x.jpg 2x"/>*/}
                            {/*        <div className="details">*/}
                            {/*            <div className="title">Removals</div>*/}
                            {/*        </div>*/}
                            {/*    </a></div>*/}
                            {/*    <div className="single-level">*/}
                            {/*        <div className="task"><a href="/design/"><img alt=""*/}
                            {/*                                                      src="/images/how_it_works/marketing.jpg"*/}
                            {/*                                                      srcSet="/images/how_it_works/marketing.jpg 1x, /images/how_it_works/marketing@2x.jpg 2x"/>*/}
                            {/*            <div className="details">*/}
                            {/*                <div className="title">Design</div>*/}
                            {/*            </div>*/}
                            {/*        </a></div>*/}
                            {/*        <div className="task"><a href="/business/"><img alt=""*/}
                            {/*                                                        src="/images/how_it_works/business.jpg"*/}
                            {/*                                                        srcSet="/images/how_it_works/business.jpg 1x, /images/how_it_works/business@2x.jpg 2x"/>*/}
                            {/*            <div className="details">*/}
                            {/*                <div className="title">Business</div>*/}
                            {/*            </div>*/}
                            {/*        </a></div>*/}
                            {/*        <div className="task wide"><a href="/assembly/"><img alt=""*/}
                            {/*                                                             src="/images/how_it_works/handyman.jpg"*/}
                            {/*                                                             srcSet="/images/how_it_works/handyman.jpg 1x, /images/how_it_works/handyman@2x.jpg 2x"/>*/}
                            {/*            <div className="details">*/}
                            {/*                <div className="title">Assembly</div>*/}
                            {/*            </div>*/}
                            {/*        </a></div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="features">
                        <div id="insurance" data-header-watch="" className="content">
                            <div className="container-inner">
                                <div className="list column-3 feature-column center white"><img alt=""
                                                                                                src="/images/how_it_works/insurance-n.png"
                                                                                                srcSet="/images/how_it_works/insurance-n.png 1x, /images/how_it_works/insurance-n@2x.png 2x"/>
                                    <h4>Top rated insurance</h4><p>Cititasker Insurance is provided by CGU. This means
                                        Taskers on Cititasker are covered for liability to third parties when it comes to
                                        personal injury or property damage (terms and conditions apply) - so you can
                                        post or
                                        earn with peace of mind!*</p></div>
                                <div className="list column-3 saver-beach-column center white"><img id="life-saver"
                                                                                                    alt=""
                                                                                                    src="/images/how_it_works/saver_beach.png"
                                                                                                    srcSet="/images/how_it_works/saver_beach.png 1x, /images/how_it_works/saver_beach@2x.png 2x"
                                                                                                    data-animate-on-reach="600"/><img
                                    alt="" src="/images/how_it_works/wave.png"
                                    srcSet="/images/how_it_works/wave.png 1x, /images/how_it_works/wave@2x.png 2x"
                                    className="wave"/>
                                    <div className="row center"><a className="button-sml button-white-onbg"
                                                                   href="/insurance/">Learn more</a></div>
                                </div>
                                <div className="list column-3 feature-column center white"><img alt=""
                                                                                                src="/images/how_it_works/customer_service-n.png"
                                                                                                srcSet="/images/how_it_works/customer_service-n.png 1x, /images/how_it_works/customer_service-n@2x.png 2x"/>
                                    <h4>Complete customer support</h4><p className="white"><span>Got a question? Simply search our comprehensive</span>
                                        <a className="link--white" href="https://support.airtasker.com/hc/en-au/">Help
                                            Centre</a> <span>for your answer. If you’re still stuck then feel free to reach out to our expert Customer Support Team who are more than happy to help.</span>
                                    </p></div>
                            </div>
                            <div className="white center terms"><span>*Terms and Conditions apply. Included Task activities only. Excesses apply for</span><br/><span>Taskers.&nbsp;</span><a
                                className="link--white" href="/insurance/">Learn more about Cititasker Insurance</a>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <div id="profiles" data-header-watch="" className="selection row-spaced">
                            <div className="content">
                                <div className="container-inner">
                                    <div className="smaller-content">
                                        <div className="list column-2 cards-column white">
                                            <div className="cards"><img alt=""
                                                                        src="/images/how_it_works/primary-card.png"
                                                                        srcSet="/images/how_it_works/primary-card.png 1x, /images/how_it_works/primary-card@2x.png 2x"
                                                                        data-animate-on-reach="500"
                                                                        className="primary-card card"/><img alt=""
                                                                                                            src="/images/how_it_works/secondary-card.png"
                                                                                                            srcSet="/images/how_it_works/secondary-card.png 1x, /images/how_it_works/secondary-card@2x.png 2x"
                                                                                                            data-animate-on-reach="500"
                                                                                                            className="secondary-card card"/><img
                                                alt="" src="/images/how_it_works/third-card.png"
                                                srcSet="/images/how_it_works/third-card.png 1x, /images/how_it_works/third-card@2x.png 2x"
                                                data-animate-on-reach="500" className="third-card card"/></div>
                                        </div>
                                        <div className="list column-2 white">
                                            <div className="descriptions"><img alt=""
                                                                               src="/images/how_it_works/review_icon.png"
                                                                               srcSet="/images/how_it_works/review_icon.png 1x, /images/how_it_works/review_icon@2x.png 2x"/>
                                                <h4>Rating &amp; Reviews</h4><p className="white">Review Tasker's
                                                    portfolios, skills, verifications on their profile, and see their
                                                    transaction verified ratings &amp; reviews on tasks they’ve
                                                    previously
                                                    completed on Cititasker. This empowers you to make sure you’re
                                                    choosing
                                                    the right person for your task.</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="private-coms" data-header-watch="-200" className="messages-call row">
                            <div className="content">
                                <div className="container-inner">
                                    <div className="smaller-content">
                                        <div className="list column-2 descriptions"><h4
                                            className="blue">Communication</h4><p>Use Cititasker to stay in contact from
                                            the moment your task is posted until it’s completed.</p>
                                            <div className="iconandtitle"><img alt=""
                                                                               src="/images/how_it_works/messages.png"
                                                                               srcSet="/images/how_it_works/messages.png 1x, /images/how_it_works/messages@2x.png 2x"
                                                                               className="icon"/><h6
                                                className="title">Private Messaging</h6></div>
                                            <p>Once you’ve accepted an offer, you can instantly reach out to the Tasker
                                                via private messaging to discuss task details, and get your task
                                                completed.</p></div>
                                        <div className="list column-2">
                                            <div id="chat-container" data-animate-on-reach="-120" className="chat"><img
                                                alt="" src="/images/how_it_works/message-1.png"
                                                srcSet="/images/how_it_works/message-1.png 1x, /images/how_it_works/message-1@2x.png 2x"
                                                data-animate-on-reach="600" className="messages m-r"/><img alt=""
                                                                                                           src="/images/how_it_works/message-2.png"
                                                                                                           srcSet="/images/how_it_works/message-2.png 1x, /images/how_it_works/message-2@2x.png 2x"
                                                                                                           data-animate-on-reach="600"
                                                                                                           className="messages m-l"/><img
                                                alt="" src="/images/how_it_works/message-3.png"
                                                srcSet="/images/how_it_works/message-3.png 1x, /images/how_it_works/message-3@2x.png 2x"
                                                data-animate-on-reach="600" className="messages m-r"/><img alt=""
                                                                                                           src="/images/how_it_works/message-4.png"
                                                                                                           srcSet="/images/how_it_works/message-4.png 1x, /images/how_it_works/message-4@2x.png 2x"
                                                                                                           data-animate-on-reach="600"
                                                                                                           className="messages m-l"/><img
                                                alt="" src="/images/how_it_works/message-5.png"
                                                srcSet="/images/how_it_works/message-5.png 1x, /images/how_it_works/message-5@2x.png 2x"
                                                data-animate-on-reach="600" className="messages m-r"/><img alt=""
                                                                                                           src="/images/how_it_works/message-6.png"
                                                                                                           srcSet="/images/how_it_works/message-6.png 1x, /images/how_it_works/message-6@2x.png 2x"
                                                                                                           data-animate-on-reach="600"
                                                                                                           className="messages m-l"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="payments" data-header-watch="-20" className="airpay row">
                            <div className="content">
                                <div className="container-inner smaller-content white">
                                    <div id="pay-card-column" className="list column-2">
                                        <div className="card-locker"><img id="pay-card" alt=""
                                                                          src="/images/how_it_works/airtasker-pay.png"
                                                                          srcSet="/images/how_it_works/airtasker-pay.png 1x, /images/how_it_works/airtasker-pay@2x.png 2x"
                                                                          data-animate-on-reach="350"/><img id="locker"
                                                                                                            alt=""
                                                                                                            src="/images/how_it_works/locker.png"
                                                                                                            srcSet="/images/how_it_works/locker.png 1x, /images/how_it_works/locker@2x.png 2x"/>
                                        </div>
                                    </div>
                                    <div className="list column-2 descriptions"><h3>Cititasker Pay</h3><p>Cititasker Pay
                                        is the seamless and secure way to get your tasks completed. Once you accept an
                                        offer on a task, the agreed upon amount is held secure with Cititasker Pay until
                                        the task is complete.</p><p>Once complete, you’ll simply need to release the
                                        payment. We’ll then transfer the task payment to the Tasker’s verified bank
                                        account.</p>
                                        <div className="airtasker-pay-container"><a
                                            className="button-sml button-white-onbg"
                                            href="https://support.airtasker.com/hc/en-au/articles/205832680-What-is-Cititasker-Pay-">Learn
                                            more</a></div>
                                    </div>
                                    <div id="pay-card-column-mobile" className="list column-2">
                                        <div className="card-locker"><img id="pay-card" alt=""
                                                                          src="/images/how_it_works/airtasker-pay.png"
                                                                          srcSet="/images/how_it_works/airtasker-pay.png 1x, /images/how_it_works/airtasker-pay@2x.png 2x"/><img
                                            id="locker" alt="" src="/images/how_it_works/locker.png"
                                            srcSet="/images/how_it_works/locker.png 1x, /images/how_it_works/locker@2x.png 2x"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="container-inner icons-section white clearfix">
                                    <div className="list column-3 center">
                                        <div className="icon"><img alt="" src="/images/how_it_works/fast.png"
                                                                   srcSet="/images/how_it_works/fast.png 1x, /images/how_it_works/fast@2x.png 2x"/>
                                        </div>
                                        <p><span>Fast and hassle</span><br/><span>free payment</span></p></div>
                                    <div className="list column-3 center">
                                        <div className="icon"><img alt="" src="/images/how_it_works/nocash.png"
                                                                   srcSet="/images/how_it_works/nocash.png 1x, /images/how_it_works/nocash@2x.png 2x"/>
                                        </div>
                                        <p><span>Cashless payments,</span><br/><span>no cash in hand</span></p></div>
                                    <div className="list column-3 center">
                                        <div className="icon"><img alt="" src="/images/how_it_works/control.png"
                                                                   srcSet="/images/how_it_works/control.png 1x, /images/how_it_works/control@2x.png 2x"/>
                                        </div>
                                        <p><span>You are always</span><br/><span>in control</span></p></div>
                                </div>
                            </div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div id="apps" data-header-watch="-20" className="apps">
                        <div className="content">
                            <div className="container-inner">
                                <div className="list column-2 text-description"><h3 className="blue">On the move?</h3>
                                    <p>Download the Cititasker App and get the tasks you need completed with just a tap
                                        of the button. You can also browse available tasks and earn money wherever you
                                        go!</p>
                                    <div className="apps-badges"><a
                                        href="https://play.google.com/store/apps/details?id=au.com.airtasker"><img
                                        alt="" src="/images/how_it_works/google-play.png"
                                        srcSet="/images/how_it_works/google-play.png 1x, /images/how_it_works/google-play@2x.png 2x"/></a><a
                                        href="https://itunes.apple.com/au/app/airtasker/id512137061?mt=8"><img alt=""
                                                                                                               src="/images/how_it_works/app-store.png"
                                                                                                               srcSet="/images/how_it_works/app-store.png 1x, /images/how_it_works/app-store@2x.png 2x"/></a>
                                    </div>
                                </div>
                                <div className="list column-2 smart-phones"><img alt=""
                                                                                 src="/images/how_it_works/apps.png"
                                                                                 srcSet="/images/how_it_works/apps.png 1x, /images/how_it_works/apps@2x.png 2x"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"/>
                    <div id="earn-money" data-header-watch="-20" className="earn-money row  ">
                        <div className="content mx-auto">
                            <div className="container-inner">
                                <div className="smaller-content">
                                    <div className="list column-2 text-white">
                                        <h3>Earn up to $5,000 per month completing tasks</h3>
                                        <div className="info-container">
                                            {/*<svg width="32" height="32" viewBox="0 0 32 32" version="1.1"*/}
                                            {/*     xmlns:xlink="http://www.w3.org/1999/xlink" className="boss icon">*/}
                                            {/*    <use x="0" y="0" width="32" height="32"*/}
                                            {/*         xlink:href="/images/icons/icon_definitions.svg#tie"></use>*/}
                                            {/*</svg>*/}
                                            <div className="desc"><h5>You're the boss</h5><p>With thousands of tasks
                                                posted every month on Cititasker there are lots of opportunities to earn.
                                                Choose the tasks you’d like to complete for people that you're happy to
                                                work with.</p></div>
                                        </div>
                                        <div className="info-container">
                                            {/*<svg width="32" height="32" viewBox="0 0 32 32" version="1.1"*/}
                                            {/*     xmlns:xlink="http://www.w3.org/1999/xlink" className="icon">*/}
                                            {/*    <use x="0" y="0" width="32" height="32"*/}
                                            {/*         xlink:href="/images/icons/icon_definitions.svg#thumbs-up"></use>*/}
                                            {/*</svg>*/}
                                            <div className="desc"><h5>Payments</h5><p>With your task payment held secure
                                                with Cititasker Pay, you're able to complete the task knowing payment
                                                will be made when you're done.</p></div>
                                        </div>
                                        <div className="info-container">
                                            {/*<svg width="32" height="32" viewBox="0 0 32 32" version="1.1"*/}
                                            {/*     xmlns:xlink="http://www.w3.org/1999/xlink" className="icon">*/}
                                            {/*    <use x="0" y="0" width="32" height="32"*/}
                                            {/*         xlink:href="/images/icons/icon_definitions.svg#life-saver"></use>*/}
                                            {/*</svg>*/}
                                            <div className="desc"><h5 className="white">Top rated insurance</h5><p
                                                className="white">Cititasker Insurance is provided by CGU. This means
                                                Taskers on Cititasker are covered for liability to third parties when it
                                                comes to personal injury or property damage (terms and conditions apply)
                                                - so you can post or earn with peace of mind!*</p></div>
                                        </div>
                                        <div className="row">
                                            <div className="Box-sc-32o1rb-0 content__JoinCititaskerCta-s82jqm-0 eREDbX">
                                                <button type="button" id="sign-up-button"
                                                        className="btn btn-sm btn-success btn-round">Join
                                                    Cititasker
                                                </button>
                                                <a href="/earn-money"
                                                   className="btn btn-sm btn-danger btn-round">Earn
                                                    money</a></div>
                                            <div className="white terms"><span>*Terms and Conditions apply. Included Task activities only. Excesses apply for</span><br/><span>Taskers.&nbsp;</span><a
                                                href="/insurance/">Learn more about Cititasker Insurance</a></div>
                                        </div>
                                    </div>
                                    <div className="list column-2 white worker-how-it-works">
                                        <img alt="How it works" src="https://www.airtasker.com/images/worker-2016.png"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Dashboard;
