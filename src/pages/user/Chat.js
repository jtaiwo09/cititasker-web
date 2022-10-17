import React from 'react';
import Layout from "../../layouts/UserLayout";
import {connect} from "react-redux";
import {loadAllChats, loadChatByOfferID, sendMessage} from "../../store/modules/chat";
import {IoMdArrowBack} from "react-icons/all";
import {isMobile} from "react-device-detect";


function ChatItem({isTyping, message, name, avatar, onShowChat, time, unread}) {
    return <div className="chat-card" onClick={onShowChat} id="single-list">
        <img src={avatar} className="avatar" alt="Profile"/>
        <div className="chat-body">
            <div className="clickable chat-title">{name}</div>
            {isTyping ? <span className="typing blinking">Typing...</span> :
                <span className="chat-text">{message}</span>}
        </div>
        <div className="times">
            <span className="chat-text">{time}</span>
            {unread && <span className="badge btn-round badge-sb-primary">{unread}</span>}
        </div>
    </div>;
}

function ChatMessage({reply, hideImage, isFile, image, avatar, message, name, time}) {
    let classType = "message-container";
    let showImage = true;
    if (hideImage) {
        showImage = false
    }
    if (reply) {
        classType += "  my-reply";
        showImage = false
    }

    let content = message;
    if (image) {
        content = (
            <div className="d-flex w-100 flex-column">
                <img alt="..." style={{width: 280, height: 240}} src={image}/>
                {message && <div>{message}</div>}
            </div>
        )
    }

    if (isFile) {
        content = <div className="aligned">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                 fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 className="feather feather-file-text">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <div className="file-info">
                <a href="./#">Project-Spec.docx</a>
                <span>208.68 KB</span>
            </div>
        </div>
    }
    return <div className={classType}>
        {showImage ? <img src={avatar} alt="profile pic"/> : reply ? null :
            <div style={{width: 60}}/>}
        <div className="message-block">
            {!(hideImage) && <span className="message-time">{name && (`${name},`)} {time}</span>}
            <div className="message">
                <div className="message-body">
                    {content}
                </div>
            </div>
        </div>
    </div>;
}

class ChatMessages extends React.Component {
    state = {
        selected: false, receiver: {}, chat_id: null, sendAble: false, file: null, message: '',
        chat_view: !this.props?.chats?.length
    };
    renderChats = () => {
        const {messages} = this.props;
        const {receiver} = this.state
        const dates = Object.keys(messages);
        return dates.map((date, index) => (
                <div className="w-100">
                    <div className="text-center text-primary mt-2 mb-0 p-0" style={{fontSize: 8}}>{date}</div>
                    {messages[date].map((message, index, arr) =>
                        <ChatMessage
                            time={message.time} reply={message.is_sender}
                            hideImage={index !== 0 && message.author.uuid === arr[index - 1].author.uuid}
                            avatar={receiver.avatar} message={message.message}
                        />)}
                </div>
            )
        )
    };


    scrollToBottom = () => {
        const messages = document.getElementById('messages-div');
        messages.scrollTop = messages.scrollHeight;
    }


    componentDidMount() {
        this.loadChat()
        this.interval = setInterval(() => this.loadChat(), 15000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    loadChat = () => {
        const offer_id = new URL(window.location.href).searchParams.get('offer_id');
        if (offer_id) {
            this.props.loadChatByOfferID(this);
        }
    }

    render() {
        const {messages, chats} = this.props;
        const {receiver, selected, chat_view} = this.state;
        const dates = Object.keys(messages || {});
        return (
            <Layout noSidebar transparent bgWhite>
                <div className="px-3 flex-fill  h-100 w-100" style={{flex: 1}}>
                    {
                        isMobile ?

                            <div className="row h-100" style={{flex: 1}}>

                                {!chat_view ?
                                    <div id="list-view"
                                         className={"col-sm-12 h-100"}
                                         style={{maxHeight: 'calc(100vh - 116px)', minHeight: 'calc(100vh - 116px)'}}>
                                        <div className="card p-2  flex-column d-flex  h-100">
                                            <div className="px-2 py-3">
                                                <form>
                                                    <div className="search">
                                                        <span className="fa fa-search form-control-feedback"/>
                                                        <input type="text" placeholder="Search "/>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="py-3 px-2" style={{flex: 1}}>
                                                {chats && chats.map((chat, index) =>
                                                    <ChatItem
                                                        key={index}
                                                        avatar={chat.avatar}
                                                        onShowChat={() => this.setState({chat_view: true})}
                                                        name={chat.name} message={chat.message}
                                                        time={chat.time}/>
                                                )}
                                                {chats && !chats.length &&
                                                <p className="text-center fs-14 italic">No Messages</p>}
                                            </div>
                                        </div>
                                    </div>
                                    :

                                    <div id="chat-view"
                                         className={"col-sm-12 d-sm-block "}
                                         style={{maxHeight: 'calc(100vh - 116px)', minHeight: 'calc(100vh - 116px)'}}>
                                        {
                                            selected ?
                                                <div className="card flex-column d-flex bg-white h-100 "
                                                     style={{padding: '15px 20px 10px'}}>
                                                    <div className="bg-white w-100 m-0 chat-card">
                                                        <button onClick={() => this.setState({chat_view: false})}
                                                                className="btn-circle btn btn-primary mr-2 d-sm-none">
                                                            <IoMdArrowBack/>
                                                        </button>

                                                        <img src={receiver.avatar} className="avatar" alt="Profile"/>
                                                        <div className="chat-body">
                                                            <a href="./#"><span
                                                                className="chat-title">{receiver.name}</span></a>
                                                            <span
                                                                className="chat-text">{receiver.description} | {receiver.location}</span>
                                                        </div>
                                                        <div className="widget-19-user-action">
                                                        </div>
                                                    </div>
                                                    <hr className="p-0 mx-0 my-2"/>
                                                    <div className="scroll-vertical" id="messages-div"
                                                         style={{flex: 1}}>
                                                        {this.renderChats()}

                                                        {!dates.length &&
                                                        <div
                                                            className="px-3 text-center justified aligned flex-column h-100 w-100">
                                                            <img src="/images/no-chats.png" alt="no message"
                                                                 className="mx-auto"
                                                                 style={{width: 300}}/>
                                                            <p className="pb-0 mt-2 fs-14">Send a message
                                                                to {receiver.name}</p>
                                                        </div>}
                                                    </div>
                                                    <form encType="multipart/form-data" onSubmit={(e) => {
                                                        e.preventDefault()
                                                        this.props.sendMessage(this)
                                                    }} id="chat-form" className="chat-input" autoComplete="off">
                                                        <input id="files" type="file" multiple name="files" hidden/>
                                                        <input type="text" id="chat-input" name="message"
                                                               value={this.state.message}
                                                               required
                                                               onChange={(e) => this.setState({message: e.target.value})}
                                                               placeholder="Type a message here..."/>

                                                        <div className="widget-19-action-pane">
                                                            <button type="button"
                                                                    onClick={() => document.getElementById('files').click()}
                                                                    className="btn btn-soft-secondary btn-rounded btn-icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                     height="24"
                                                                     viewBox="0 0 24 24" fill="none"
                                                                     stroke="currentColor"
                                                                     stroke-width="2" stroke-linecap="round"
                                                                     stroke-linejoin="round"
                                                                     className="feather feather-paperclip">
                                                                    <path
                                                                        d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                                                                </svg>
                                                            </button>
                                                            <button className="btn btn-success btn-rounded btn-icon"
                                                                    type="submit"
                                                                    disabled={!this.state.message.length}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                     height="24"
                                                                     viewBox="0 0 24 24" fill="none"
                                                                     stroke="currentColor"
                                                                     stroke-width="2" stroke-linecap="round"
                                                                     stroke-linejoin="round"
                                                                     className="feather feather-send">
                                                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                                                    <polygon
                                                                        points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                                :
                                                <div
                                                    className="px-3 text-center justified aligned flex-column card h-100 w-100">
                                                    <img src="/images/no-chat.png" alt="no message" className="mx-auto"
                                                         style={{width: 300}}/>
                                                    <p className="pb-0 mt-2 fs-14">No Chat Selected</p>
                                                </div>
                                        }
                                    </div>
                                }
                            </div> :
                            <div className="row h-100" style={{flex: 1}}>

                                <div id="list-view" className={`col-sm-4 h-100`}
                                     style={{maxHeight: 'calc(100vh - 116px)', minHeight: 'calc(100vh - 116px)'}}>
                                    <div className="card p-2  flex-column d-flex  h-100">
                                        <div className="px-2 py-3">
                                            <form>
                                                <div className="search">
                                                    <span className="fa fa-search form-control-feedback"/>
                                                    <input type="text" placeholder="Search "/>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="py-3 px-2" style={{flex: 1}}>
                                            {chats && chats.map((chat, index) =>
                                                <ChatItem
                                                    key={index}
                                                    avatar={chat.avatar}
                                                    onShowChat={() => this.setState({chat_view: true})}
                                                    name={chat.name} message={chat.message}
                                                    time={chat.time}/>
                                            )}
                                            {chats && !chats.length &&
                                            <p className="text-center fs-14 italic">No Messages</p>}
                                        </div>
                                    </div>
                                </div>

                                <div id="chat-view" className={`col-sm-8 d-sm-block`}
                                     style={{maxHeight: 'calc(100vh - 116px)', minHeight: 'calc(100vh - 116px)'}}>
                                    {
                                        selected ?
                                            <div className="card flex-column d-flex bg-white h-100 "
                                                 style={{padding: '15px 20px 10px'}}>
                                                <div className="bg-white w-100 m-0 chat-card">
                                                    <button onClick={() => this.setState({chat_view: false})}
                                                            className="btn-circle btn btn-primary mr-2 d-sm-none">
                                                        <IoMdArrowBack/>
                                                    </button>

                                                    <img src={receiver.avatar} className="avatar" alt="Profile"/>
                                                    <div className="chat-body">
                                                        <a href="./#"><span
                                                            className="chat-title">{receiver.name}</span></a>
                                                        <span
                                                            className="chat-text">{receiver.description} | {receiver.location}</span>
                                                    </div>
                                                    <div className="widget-19-user-action">
                                                    </div>
                                                </div>
                                                <hr className="p-0 mx-0 my-2"/>
                                                <div className="scroll-vertical" id="messages-div" style={{flex: 1}}>
                                                    {this.renderChats()}

                                                    {!dates.length &&
                                                    <div
                                                        className="px-3 text-center justified aligned flex-column h-100 w-100">
                                                        <img src="/images/no-chats.png" alt="no message"
                                                             className="mx-auto"
                                                             style={{width: 300}}/>
                                                        <p className="pb-0 mt-2 fs-14">Send a message
                                                            to {receiver.name}</p>
                                                    </div>}
                                                </div>
                                                <form encType="multipart/form-data" onSubmit={(e) => {
                                                    e.preventDefault()
                                                    this.props.sendMessage(this)
                                                }} id="chat-form" className="chat-input" autoComplete="off">
                                                    <input id="files" type="file" multiple name="files" hidden/>
                                                    <input type="text" id="chat-input" name="message"
                                                           value={this.state.message}
                                                           required
                                                           onChange={(e) => this.setState({message: e.target.value})}
                                                           placeholder="Type a message here..."/>

                                                    <div className="widget-19-action-pane">
                                                        <button type="button"
                                                                onClick={() => document.getElementById('files').click()}
                                                                className="btn btn-soft-secondary btn-rounded btn-icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                 height="24"
                                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                                 stroke-width="2" stroke-linecap="round"
                                                                 stroke-linejoin="round"
                                                                 className="feather feather-paperclip">
                                                                <path
                                                                    d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                                                            </svg>
                                                        </button>
                                                        <button className="btn btn-success btn-rounded btn-icon"
                                                                type="submit"
                                                                disabled={!this.state.message.length}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24"
                                                                 height="24"
                                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                                 stroke-width="2" stroke-linecap="round"
                                                                 stroke-linejoin="round"
                                                                 className="feather feather-send">
                                                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            :
                                            <div
                                                className="px-3 text-center justified aligned flex-column card h-100 w-100">
                                                <img src="/images/no-chat.png" alt="no message" className="mx-auto"
                                                     style={{width: 300}}/>
                                                <p className="pb-0 mt-2 fs-14">No Chat Selected</p>
                                            </div>
                                    }
                                </div>
                            </div>
                    }
                </div>
            </Layout>
        );
    }
}

export default connect(({User: user, Chat}) => ({user, ...Chat}), {
    sendMessage,
    loadAllChats,
    loadChatByOfferID
})(ChatMessages);
