import React, {Component} from 'react';
import {AppService} from "../../services";
import {catchError} from "../../utils";
import {GiPaperClip} from "react-icons/gi";
import {Input} from "reactstrap";
import {toast} from "react-toastify";
import {GoReply} from "react-icons/go";

export class CommentForm extends Component {
    render() {
        return <div className="d-flex mt-2">
            <div>
                <img alt="..." src={this.props.user && this.props.user.avatar_url}
                     className="userProfile"/>
            </div>
            <form style={{flex: "auto"}} id={this.props.formId} onSubmit={this.props.onSubmit}>
                <div style={{flex: "auto", borderRadius: 6}}
                     className="ml-3 p-2 border">
                    <Input
                        placeHolder={"Send a reply"}
                        type="textarea" name="comment"
                        onChange={this.props.onChange}
                        className="form-control border-0"/>

                    <input id={"file" + this.props.formId} name="file" hidden type="file" accept="image/*"/>
                    <input name="task_id" hidden value={this.props.value}/>
                    <div className="d-flex mt-2 spaced aligned">
                        <GiPaperClip
                            style={{cursor: "pointer"}}
                            onClick={this.props.onClick}
                            className="ml-3 fs-18"/>
                        <div className="aligned">
                            <span>{1500 - this.props.reply.length}</span>
                            <button type={"submit"}
                                    className="btn-transparent btn-sm btn-round btn ml-3 ">
                                Send
                            </button>
                        </div>
                    </div>

                </div>
            </form>
        </div>;
    }
}

export class TaskReply extends Component {
    state = {
        replies: [], openReply: false, reply: ''
    };

    componentDidMount() {
        let {comment: {id}, id: task_id} = this.props;
        AppService.getTaskCommentReply(task_id, id).then(({data}) => {
            this.setState({replies: data.data || {}})
        }).catch(catchError).finally(() => this.setState({openReply: false,}))
    }

    componentDidUpdate(prevProps, prevState, snapshot): void {
    }


    submitReply = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        this.setState({isLoading: true});
        let {comment: {id: reply_id}, id: task_id} = this.props;
        AppService.sendReply(task_id, reply_id, form).then((res) => {
            toast.success('Reply Comment sent successfully');
            AppService.getTaskCommentReply(task_id, reply_id).then(({data}) => {
                this.setState({replies: data.data || {}})
            }).catch(catchError)
            const replyForm = document.getElementById(`reply_form${reply_id}`)
            if (replyForm) {
                replyForm.reset();
            }
            document.getElementById(`focus_view${reply_id}`).focus({preventScroll: false});
        }).catch(er => catchError(er)).finally(() => {
            this.setState({openReply: false, isLoading: false});
        })
    };

    render() {
        let {comment, owner, id, user, hideReplyBtn} = this.props;
        let {comment: {id: reply_id}} = this.props;

        const {openReply, reply, replies} = this.state;
        return <div className="d-flex mt-4">
            <div>
                <img alt={'...'} src={comment.user && comment.user.avatar_url} className="userProfile"/>
            </div>
            <div style={{flex: 1,}} className="ml-3">
                <div>
                    <a href="./#">{comment.user && comment.user.last_name} {comment.user && comment.user.first_name
                    && comment.user.first_name[0]}</a>
                    {
                        owner &&
                        <span className="ml-3 radius-24 opacity-3 btn-sm btn-primary">POSTER</span>
                    }

                </div>
                <div className="ff-300 py-2 fs-14">
                    {comment.text}
                </div>
                <div className="mt-2 spaced">
                    <div>
                        <span className="fs-10  fw-100 ff-100">{comment.created_at}</span>
                        {!hideReplyBtn &&
                        <span onClick={() => this.setState({openReply: true}, () => {
                            document.getElementById(`focus_view${reply_id}`).focus({preventScroll: false})
                        })} className="pointer ml-4 text-primary-hover"><GoReply className="mr-1"/> Reply</span>}
                    </div>
                    {/*<div className="report-hover-show text-primary-hover pointer"><span>Report </span><GrFlag/></div>*/}
                </div>
                {/*Show replies*/}
                <div>
                    {openReply &&
                    <CommentForm user={user} onSubmit={this.submitReply} formId={`reply_form${reply_id}`}
                                 onChange={e => this.setState({comment: e.target.value})}
                                 value={id} onClick={() => {
                        document.getElementById(`file-reply_form${reply_id}`).click()
                    }} reply={reply}/>}

                    <div id={`focus_view${reply_id}`}/>
                    {
                        replies.map((comment, index) =>
                            <ChildReply
                                comment={comment} user={user}
                                owner={user.id === comment.user_id}
                                key={'replies' + index} id={id}/>)
                    }


                </div>

            </div>
        </div>;
    }
}

export class ChildReply extends Component {
    state = {
        replies: [], openReply: false, comment: ''
    }

    // componentDidMount() {
    //     let {comment: {id}, id: task_id} = this.props;
    //     AppService.getTaskCommentReply(task_id, id).then(({data}) => {
    //         this.setState({replies: data.data || {}})
    //     }).catch(catchError)
    // }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    }


    submitComment = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        this.setState({isLoading: true});

        let {comment: {id}, id: task_id} = this.props;
        AppService.sendReply(task_id, id, form).then((res) => {
            toast.success('Reply Comment sent successfully');

            const replyForm = document.getElementById('reply_form');
            if (replyForm) {
                replyForm.reset();
            }
            AppService.getTaskCommentReply(task_id, id).then(({data}) => {
                this.setState({replies: data.data || {}})
            }).catch(catchError)
        }).catch(er => catchError(er)).finally(() => {
            this.setState({isLoading: false});
        })
    };

    render() {
        let {comment, owner} = this.props;
        // const {openReply, comment: reply} = this.state
        return <div className="d-flex mt-4">
            <div>
                <img alt={'...'} src={comment.user && comment.user.avatar_url} className="userProfile"/>
            </div>
            <div style={{flex: 1,}} className="ml-3">
                <div>
                    <a href={'./#'}>{comment.user && comment.user.last_name} {comment.user && comment.user.first_name
                    && comment.user.first_name[0]}</a>
                    {
                        owner &&
                        <span className="ml-3 radius-24 opacity-3 btn-sm btn-primary">POSTER</span>
                    }

                </div>
                <div className="ff-300 py-2 fs-14">
                    {comment.text}
                </div>
                <div className="mt-2 spaced">
                    <div>
                        <span className="fs-10  fw-100 ff-100">{comment.created_at}</span>
                    </div>
                    {/*<div className="report-hover-show text-primary-hover pointer"><span>Report </span><GrFlag/></div>*/}
                </div>
            </div>
        </div>;
    }
}
