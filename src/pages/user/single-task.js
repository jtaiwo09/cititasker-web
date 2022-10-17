import React, {Component} from "react";
import {FaExternalLinkAlt, FaFacebook, FaLinkedinIn, FaStar, FaTwitter} from "react-icons/fa";
import {GiPaperClip} from "react-icons/gi";
import {GrCalendar, GrLocation} from "react-icons/gr";
import {connect} from "react-redux";
import {Link, NavLink} from "react-router-dom";
import {toast} from "react-toastify";
import {DropdownItem, DropdownMenu, DropdownToggle, Input, UncontrolledDropdown} from "reactstrap";
import Spinner from "reactstrap/es/Spinner";
import * as SweetAlert from 'sweetalert2';
import {TaskCard} from "../../components/Common";
import Layout from "../../components/Layout";
import {TaskReply} from "../../components/Task/Comments";
import TaskOffers, {SingleOffer} from "../../components/Task/TaskOffers";
import {AppService} from '../../services/';
import {
    closeNavSetting,
    closeReferer,
    openNavSetting,
    openReferer,
    postSimilar,

    setAppState, toggleEditOffer,
    toggleOffer
} from "../../store/modules/app";
import {catchError, isNull, Naira} from "../../utils";
import Auth from '../../utils/AuthenticationHandler';
import {ASSIGNED, CANCELLED, COMPLETED, DRAFT} from "../../utils/Constants";

const StarRate = ({active, onPress}) =>
    <FaStar style={{color: active ? 'gold' : 'white', cursor: 'pointer'}} onClick={onPress} className="mr-1"/>

class SingleTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [], task: {}, comments: [], comment: '', isLoading: false, showOffer: false, myOffer: null,
            btnIsLoading: false, showReview: false, star: 0, review: '', reviewLoading: false
        }
    }

    componentDidMount() {
        this.loadTask();
        window.loadCurrentTask = this.loadTask
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {match: pMatch} = prevProps;
        const {match} = this.props
        if (pMatch.params.task !== match.params.task) {
            this.loadTask();
        }
    }

    loadTask = () => {
        const list = this.props.location.pathname.split('-');
        const id = list[list.length - 1];
        this.setState({isLoading: true, myOffer: null, showOffer: false});
        AppService.getSingleTask(id).then(({data}) => {
            this.setState({task: data.data || {}})
            const {user} = this.props;
            const isOwner = user.uuid === data.data.user.uuid;
            if (!isOwner) {
                AppService.getMyOffer(id).then(({data}) => {
                    this.setState({myOffer: data.data})
                }).catch(() => {
                })
            }
            AppService.getTaskComments(id).then(({data}) => {
                this.setState({comments: data.data || {}})
            }).catch(catchError)
        }).catch((error) => {
            if (error.response.status === 404) {
                return this.props.history.replace('/task not found');
            }
            catchError(error)
        }).finally(() => {
            this.setState({isLoading: false})
        });
        AppService.allTask().then(({data}) => this.setState({listData: data.data || []})
        ).catch(catchError)
    };

    showSingle = (details) => {
        this.setState({isSingle: true})
    };

    submitComment = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        this.setState({isLoading: true});
        const list = this.props.location.pathname.split('-');
        const id = list[list.length - 1];
        AppService.sendComment(id, form).then((res) => {
            toast.success('Comment sent successfully');

            const replyForm = document.getElementById('comment_form');
            if (replyForm) {
                replyForm.reset();
            }
            AppService.getTaskComments(id).then(({data}) => {
                this.setState({comments: data.data || {}})
            }).catch(catchError)
        }).catch(er => catchError(er)).finally(() => {
            this.setState({isLoading: false});
        })
    };

    render() {
        const {listData} = this.state;
        return (
            <Layout noSidebar noFooter bgWhite>
                {/* <ReviewTask /> */}

                <div className={`vw-100 d-flex bg-white`}>
                    <div className={`w-1024 d-flex mx-auto max-vh-100 bg-white`}>
                        <div className="flex-fill main-wrapper  " style={{maxHeight: '100%'}}>
                            <div className="d-flex  " style={{marginTop: -30}}>

                                <div style={{width: 320, minHeight: '88vh', maxHeight: 600}}
                                     className="d-none d-lg-block fixed scroll-vertical">
                                    {
                                        listData.map(data => {
                                            return <TaskCard key={'task' + data.id} data={data}/>
                                        })
                                    }
                                </div>
                                {this.renderView()}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    renderTaskDetails() {
        const {task, showOffer, star, review, reviewLoading} = this.state;
        const {user, toggleOffer, postSimilar} = this.props;
        const list = this.props.location.pathname.split('-');
        const id = list[list.length - 1];
        let isOwner = false;
        let owner_id = '';
        if (user.hasOwnProperty('uuid') && task.hasOwnProperty('user')) {
            owner_id = task.user.uuid
            isOwner = user.uuid === owner_id;
        }
        if (showOffer)
            return <TaskOffers updateState={(state) => this.setState({...state})} task={task}/>
        let hideMoreOpt = false;
        if (task.hasOwnProperty('status') && ['CANCELLED', 'COMPLETED'].includes(task.status)) {
            hideMoreOpt = true;
        }

        const statusBtnClass = (status) => {
            let color = "btn-round btn-sm ff-300 mr-3 btn";
            if (task.status === status) {
                color += " btn-secondary opacity-8 text-white"
            } else {
                color += " btn-transparent "
            }
            return color;
        };


        return (
            <div className="row">
                <div className="col-sm-8">
                    <div className="w-100 d-flex spaced">
                        <div className="fs-14 aligned">
                            {
                                ['OPEN', 'ASSIGNED', 'COMPLETED'].includes(task.status) ?
                                    <>
                                        <button className={statusBtnClass('OPEN')}>OPEN</button>
                                        <button className={statusBtnClass('ASSIGNED')}>ASSIGNED</button>
                                        <button className={statusBtnClass('COMPLETED')}>COMPLETED</button>
                                    </> :
                                    <button
                                        className="btn-round btn-sm ff-300 text-white opacity-8 btn-danger mr-3 btn">
                                        {task.status || 'DRAFT'}
                                    </button>
                            }


                        </div>
                        {/*<div className="text-right">*/}
                        {/*    Edit Task*/}
                        {/*</div>*/}
                    </div>

                    <div className="py-3 pr-2">
                        <span className="ff-500" style={{fontSize: 26}}>
                            {task.title}
                        </span>
                    </div>

                    {(isOwner && task && task.progress === 1 && task.status !== COMPLETED) ?
                        <div className="p-2 radius-8 bg-warning">
                        <span className="ff-300 text-white mr-2" style={{fontSize: 12}}>
                            You are realising payment to {task.user.name}. for "{task.title}".
                            Please verify that the task has been completed to you requirements.
                        </span>
                            <button onClick={() => {
                                this.setState({showReview: true})
                            }} className="btn-sm btn-success btn-round btn ff-500 fs-10">
                                Release Fund & Give a Review
                            </button>

                            {this.state.showReview && <div className="m-2">
                                <div className="fs-12 text-white my-2 ">Pick Star Rating &nbsp;
                                    <StarRate active={star > 0} onPress={() => this.setState({star: 1})}/>
                                    <StarRate active={star > 1} onPress={() => this.setState({star: 2})}/>
                                    <StarRate active={star > 2} onPress={() => this.setState({star: 3})}/>
                                    <StarRate active={star > 3} onPress={() => this.setState({star: 4})}/>
                                    <StarRate active={star > 4} onPress={() => this.setState({star: 5})}/>
                                </div>
                                <textarea rows={5} onChange={(e) => {
                                    this.setState({review: e.target.value})
                                }} className="fs-12 form-control mb-3" placeholder="Enter a review"/>
                                <button onClick={() => {
                                    this.setState({reviewLoading: true})
                                    AppService.completeTask({stars: star, review, task_id: id}).then(({data}) => {
                                        SweetAlert.fire('Task Completed', 'Fund is released to Tasker', 'success');
                                        this.loadTask();

                                    }).catch(catchError).finally(() => this.setState({reviewLoading: false}))
                                }} className="btn-sm btn-success btn-round btn ff-500 fs-10">
                                    {reviewLoading ? <Spinner/> : 'Release Fund'}
                                </button>
                                &nbsp;
                                <button onClick={() => {
                                    this.setState({showReview: false})
                                }}
                                        className="btn-sm btn-danger btn-round btn ff-500 fs-10">
                                    Close
                                </button>
                            </div>}

                        </div> : null}


                    <div className="d-flex mt-2">
                        <div>
                            <img src={task && task.user && task.user.avatar_url}
                                 alt={'profile'}
                                 className="userProfile"/>
                        </div>
                        <div style={{flex: 1}} className="ml-3">
                            <span className="ff-500">POSTED BY</span>
                            <div className="spaced">
                                <NavLink exact to={`/users/${owner_id}`}>
                                    <span>
                                        {task.user && task.user.last_name}{' '}
                                        {task.user && task.user.first_name && task.user.first_name[0]}.
                                    </span>
                                </NavLink>

                                <span>{task.created_at}</span>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div style={{width: 35}} className="justified">
                            <GrLocation className="task-detail-icon"/>
                        </div>
                        <div style={{flex: 1}} className="ml-3">
                            <span className="ff-500">LOCATION</span>
                            <div className="spaced">
                                <span>{task.type}</span>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex mt-2">
                        <div style={{width: 35}} className="justified">
                            <GrCalendar className="task-detail-icon"/>
                        </div>
                        <div style={{flex: 1}} className="ml-3">
                            <span className="ff-500">DATE</span>
                            <div className="spaced">
                                <span>{task.due_date}</span>
                            </div>
                        </div>
                    </div>

                    {['ASSIGNED', 'COMPLETED'].includes(task.status) ? <div className="d-flex mt-2">
                        <div>
                            <img src={task && task.tasker && task.tasker.avatar_url}
                                 alt={'profile'}
                                 className="userProfile"/>
                        </div>
                        <div style={{flex: 1}} className="ml-3">
                            <span className="ff-500">Assigned To</span>
                            <div className="spaced">
                                <NavLink exact to={`/users/${task?.tasker?.uuid || '#'}`}>
                                    <span>
                                        {task.tasker && task.tasker.last_name}{' '}
                                        {task.tasker && task.tasker.first_name && task.tasker.first_name[0]}.
                                    </span>
                                </NavLink>

                                <span>{task.created_at}</span>
                            </div>
                        </div>
                    </div> : <div/>
                    }
                    <div className="mt-3">
                        <div className="ff-700">DETAILS</div>
                        <div className="ff-300 p-2">
                            {task.description}
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="border text-center py-2 " style={{borderRadius: 8}}>
                        <span className="ff-700">TASK BUDGET</span>
                        <div className="py-2 border-top border-bottom ">
                            <span
                                className="fs-30 ff-700">{Naira + (task.price || 0)}</span>
                        </div>
                        <div className="py-1 px-3">
                            {this.renderTaskManualButton(task, isOwner, toggleOffer, hideMoreOpt)}
                        </div>
                    </div>
                    {!Auth.isAuthenticated() ? <div style={{height: 10}}/> : isOwner ?
                        <UncontrolledDropdown className="w-100 my-3">
                            <DropdownToggle
                                className="bg-transparent btn-transparent w-100"
                                style={{height: 30}} caret>
                                <span className="mr-auto">More Options</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                {!hideMoreOpt &&
                                <DropdownItem
                                    onClick={() => this.setState({showOffer: true})}>
                                    View Offers
                                </DropdownItem>
                                }
                                {/*{*/}
                                {/*    !hideMoreOpt &&*/}
                                {/*    <DropdownItem onClick={() => {*/}
                                {/*        SweetAlert.fire({*/}
                                {/*            title: 'Are you sure?',*/}
                                {/*            text: 'No one will be able to send you offer on this task',*/}
                                {/*            type: 'warning',*/}
                                {/*            showCancelButton: true,*/}
                                {/*            confirmButtonText: 'Yes, Cancel it!',*/}
                                {/*            cancelButtonText: 'No, keep it'*/}
                                {/*        }).then((result) => {*/}
                                {/*            if (result.value) {*/}
                                {/*                AppService.suspendSingleTask(id)*/}
                                {/*                    .then((data) => {*/}
                                {/*                        SweetAlert.fire(*/}
                                {/*                            'Cancelled!',*/}
                                {/*                            'Task Post has been saved as draft.',*/}
                                {/*                            'success'*/}
                                {/*                        )*/}

                                {/*                        this.setState({task: data.data || {}})*/}
                                {/*                    })*/}
                                {/*                    .catch(catchError);*/}
                                {/*            } else if (result.dismiss === SweetAlert.DismissReason.cancel) {*/}
                                {/*                toast.info('Post intact')*/}
                                {/*            }*/}
                                {/*        })*/}
                                {/*    }}>*/}
                                {/*        Suspend Task*/}
                                {/*    </DropdownItem>}*/}
                                <DropdownItem onClick={postSimilar}>
                                    Post Similar Task
                                </DropdownItem>
                                <hr className="m-0 p-0"/>
                                {
                                    hideMoreOpt ?
                                        <DropdownItem
                                            className="text-danger"
                                            onClick={() => {
                                                SweetAlert.fire({
                                                    title: 'Are you sure?',
                                                    text: 'No one will be able to send you offer on this task',
                                                    type: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonText: 'Yes, Cancel it!',
                                                    cancelButtonText: 'No, keep it'
                                                }).then((result) => {
                                                    if (result.value) {
                                                        AppService.cancelSingleTask(id)
                                                            .then((data) => {
                                                                SweetAlert.fire(
                                                                    'Cancelled!',
                                                                    'Task Post has been cancelled.',
                                                                    'success'
                                                                )

                                                                this.setState({task: data.data || {}})
                                                            })
                                                            .catch(catchError);

                                                        // For more information about handling dismissals please visit
                                                        // https://sweetalert2.github.io/#handling-dismissals
                                                    } else if (result.dismiss === SweetAlert.DismissReason.cancel) {
                                                        toast.info('Post intact')
                                                    }
                                                })
                                            }}>
                                            Delete Task and Comments
                                        </DropdownItem> :
                                        <DropdownItem className="text-danger"
                                                      onClick={() => {
                                                          SweetAlert.fire({
                                                              title: 'Are you sure?',
                                                              text: 'No one will be able to send you offer on this task',
                                                              type: 'warning',
                                                              showCancelButton: true,
                                                              confirmButtonText: 'Yes, Cancel it!',
                                                              cancelButtonText: 'No, keep it'
                                                          }).then((result) => {
                                                              if (result.value) {
                                                                  AppService.cancelSingleTask(id)
                                                                      .then((data) => {
                                                                          SweetAlert.fire(
                                                                              'Cancelled!',
                                                                              'Task Post has been cancelled.',
                                                                              'success'
                                                                          )

                                                                          this.setState({task: data.data || {}})
                                                                      })
                                                                      .catch(catchError);

                                                                  // For more information about handling dismissals please visit
                                                                  // https://sweetalert2.github.io/#handling-dismissals
                                                              } else if (result.dismiss === SweetAlert.DismissReason.cancel) {
                                                                  toast.info('Post intact')
                                                              }
                                                          })
                                                      }}>
                                            Cancel Task
                                        </DropdownItem>
                                }
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        :
                        <UncontrolledDropdown className="w-100 my-3">
                            <DropdownToggle
                                className="bg-transparent btn-transparent w-100"
                                style={{height: 30}} caret>
                                <span className="mr-auto">More Options</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={postSimilar}>Post Similar Task</DropdownItem>
                                {[ASSIGNED].includes(task.status) &&
                                (task.tasker_id === user.userdetail.user_id) &&
                                <DropdownItem onClick={this.openChat}>Chat Poster</DropdownItem>

                                }
                                {/*<DropdownItem>Set Up Alert</DropdownItem>*/}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    }

                    {
                        !Auth.isAuthenticated() ? <div style={{height: 10}}/> : !hideMoreOpt &&
                            <div className="d-block position-relative"><span
                                style={{'zIndex': 100, top: 0, left: '36%', marginTop: -7, position: 'absolute'}}
                                className="py-0 px-2 bg-white ">Share</span>
                                <div
                                    className="w-100 radius-4 fs-18 border-black border py-3 px-4 spaced">
                                    <FaFacebook/>
                                    <FaTwitter/>
                                    <FaLinkedinIn/>
                                    <FaExternalLinkAlt/>
                                </div>
                            </div>
                    }
                </div>
            </div>
        )
    }

    renderTaskManualButton(task, isOwner, toggleOffer, hideMoreOpt) {
        const {myOffer, btnIsLoading} = this.state
        if ([DRAFT, CANCELLED, COMPLETED].includes(task.status)) {
            return null
        }

        if (!Auth.isAuthenticated()) {
            return <NavLink className="btn w-100 btn-round btn-primary text-white" to="/login">Login </NavLink>
        }


        if (!isOwner) {
            if ([ASSIGNED].includes(task.status)) {
                const {user} = this.props;

                if (task.tasker_id === user.userdetail.user_id) {
                    return (
                        <button className="btn w-100 btn-round btn-primary text-white"
                                disabled={task.progress === 1}
                                onClick={this.requestFunds}>
                            {btnIsLoading ? <Spinner/> : 'Request Fund'}
                        </button>
                    )
                }
                return null
            }
            if (!isNull(myOffer)) {
                return <>
                    <button onClick={() => this.props.toggleEditOffer(myOffer, task)}
                            className="btn w-100 btn-round btn-primary text-white">
                        Edit Offer
                    </button>
                    <button onClick={() => {
                        SweetAlert.fire({
                            title: 'Are You Sure ',
                            text: 'You are about to withdraw your offer',
                            type: 'question',
                            showCancelButton: true,
                            showConfirmButton: true,
                            confirmButtonText: 'Yes I do',
                            cancelButtonText: 'No I do not',
                            backdrop: true,
                            cancelButtonClass: 'bg-danger btn-round btn btn-sm',
                            confirmButtonClass: 'bg-success btn-round btn btn-sm',
                            showLoaderOnConfirm: true
                        }).then(({value}) => {
                            if (value) {
                                AppService.deleteOffer(myOffer.id).then(({data}) => {
                                    SweetAlert.fire('Successful ',
                                        'Your offer has been withdrawn ',
                                        'success')
                                        .then(this.loadTask)
                                }).catch(catchError);
                                return
                            }
                            SweetAlert.fire('', 'Task intact', 'info')
                        });
                    }} className="btn w-100 mt-2 btn-sm fs-12 fw-bold btn-round btn-danger text-white">
                        Withdraw Offer
                    </button>

                </>
            }

            return <button onClick={() => toggleOffer(task)}
                           className="btn w-100 btn-round btn-success text-white">
                Make Offer
            </button>
        }


        if ([ASSIGNED].includes(task.status)) {
            return <button className="btn w-100 btn-round btn-primary text-white"
                           onClick={this.openChat}>
                Message Tasker
            </button>
        }


        if (!hideMoreOpt) {
            return (
                <button className="btn w-100 btn-round btn-primary text-white"
                        onClick={() => this.setState({showOffer: true})}>
                    View Offers
                </button>
            )
        }

        return null;

    }

    openChat = () => {
        const {task} = this.state;
        if (isNull(task.assigned_id)) {
            return SweetAlert.fire('NOT FOUND', 'Offer not found', 'info')
        }
        const offer_id = task.assigned_id;
        this.props.history.push(`/message?offer_id=${offer_id}`)
    };

    requestFunds = () => {
        const {myOffer} = this.state;
        const list = this.props.location.pathname.split('-');
        const id = list[list.length - 1];
        if (isNull(myOffer)) {
            return SweetAlert.fire('NOT FOUND', 'Offer not found', 'info')
        }
        SweetAlert.fire({
            title: 'Are You Sure ',
            text: 'Do you certify this task as job well done to the specification given to you by the poster',
            type: 'question',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Yes I do',
            cancelButtonText: 'No I do not',
            backdrop: true,
            cancelButtonClass: 'bg-danger btn-round btn btn-sm',
            confirmButtonClass: 'bg-success btn-round btn btn-sm',
            showLoaderOnConfirm: true
        }).then(({value}) => {
            if (value) {
                AppService.requestFund(id).then(({data}) => {
                    SweetAlert.fire('Successful ', 'You have successfully requested for your task payment', 'success').then(this.loadTask)
                }).catch(catchError);
                return
            }
            SweetAlert.fire('', 'Do finish up the task ', 'info')
        });
    };

    renderView() {

        const {task, comments, comment, showOffer, isLoading, myOffer} = this.state;
        const {user, toggleOffer} = this.props;
        const list = this.props.location.pathname.split('-');
        const id = list[list.length - 1];
        let isOwner = false;
        if (user.hasOwnProperty('uuid') && task.hasOwnProperty('user')) {
            isOwner = user.uuid === task.user.uuid;
        }

        if (isLoading) {
            return (
                <div className="px-3 text-center d-flex justify-content-center align-items-center"
                     style={{flex: 1, maxHeight: 600}}>
                    <Spinner/>
                </div>
            )
        }


        return <div id="task_view" className="d-block d-sm-block bg-white scroll-vertical"
                    style={{flex: 1, maxHeight: 600}}>
            <div className="px-4 pt-4 ">
                {this.renderTaskDetails()}
                {!isOwner && !['CANCELLED', 'ASSIGNED', 'COMPLETED'].includes(task.status) &&
                <div className="mt-2">
                    <div className="ff-700">OFFERS</div>
                    {isNull(myOffer) ?
                        <div className="ff-300 p-2 text-center">
                            <img alt={'..'} src="/images/make-offer.png" style={{width: 300}}/>
                            <br/>

                            {Auth.isAuthenticated() &&
                            <button
                                onClick={() => toggleOffer(task)}
                                className="btn-round btn-success text-white btn">Make Offer
                            </button>
                            }
                        </div>
                        :
                        <div>
                            <SingleOffer
                                hideAccept
                                updateState={(state) => this.setState({...state})}
                                task={task}
                                offer={myOffer}/>
                        </div>
                    }
                </div>}

                {!showOffer && <hr/>}

                {!Auth.isAuthenticated() && <div className="text-center pb-3">
                    <h4>To join the conversation</h4>
                    <div className="d-flex aligned justified">
                        <NavLink to="/register" className="btn m-0 btn-round btn-primary">
                            Register
                        </NavLink>
                        <span className="mx-4">OR</span>
                        <NavLink to="/login" className="btn m-0 btn-round btn-success">
                            Login
                        </NavLink>
                    </div>
                </div>}

                {!showOffer && <div id='reply_view'>
                    {
                        Auth.isAuthenticated() && user && !user.is_verified ?
                            <h4 className="text-center">
                                Please verify your <Link to='/account/not-verify'>account</Link>
                            </h4>
                            :
                            <>
                                <span className="ff-700 ">COMMENTS ({comments.length})</span>
                                <br/>
                                <br/>
                            </>
                    }
                    {
                        (Auth.isAuthenticated() && user && user.is_verified &&
                            !['CANCELLED', 'ASSIGNED', 'COMPLETED'].includes(task.status)) ?
                            <>
                                <p className="fs-16 p-0 m-0">
                                    Please don't share personal info through Cititasker!
                                </p>
                                <div className="d-flex mt-2">
                                    <div>
                                        <img alt={'...'} src={user && user.avatar_url}
                                             className="userProfile"/>
                                    </div>
                                    <form style={{flex: 'auto'}} id="comment_form"
                                          onSubmit={this.submitComment}>
                                        <div style={{flex: 'auto', borderRadius: 6}}
                                             className="ml-3 p-2 border">
                                            <Input
                                                placeHolder={'Ask a question'}
                                                type="textarea" name="comment"
                                                onChange={e =>
                                                    this.setState({comment: e.target.value})}
                                                className="form-control border-0"/>

                                            <input id="file" name="file" hidden type="file"
                                                   accept="image/*"
                                            />
                                            <input name="task_id" hidden value={id}/>
                                            <div className="d-flex mt-2 spaced aligned">
                                                <GiPaperClip
                                                    style={{cursor: 'pointer'}}
                                                    onClick={() => {
                                                        document.getElementById('file').click()
                                                    }}
                                                    className="ml-3 fs-18"/>
                                                <div className="aligned">
                                                    <span>{1500 - comment.length}</span>
                                                    <button type={"submit"}
                                                            className="btn-transparent btn-sm btn-round btn ml-3 ">
                                                        Send
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </form>

                                </div>
                            </> : null
                    }


                    {
                        comments.map((comment, index) =>
                            <TaskReply
                                comment={comment} user={user}
                                hideReplyBtn={['CANCELLED', 'ASSIGNED', 'COMPLETED'].includes(task.status)}
                                owner={task.user_id === comment.user_id}
                                key={'comment-' + index} id={id}/>)
                    }
                </div>}
            </div>
        </div>;
    }
}


export default connect(({Application: {showNavSetting,}, User: user}) => ({showNavSetting, user}), {
    openNavSetting, openReferer, closeReferer, toggleOffer, postSimilar, closeNavSetting, toggleEditOffer, setAppState
})(SingleTask)
