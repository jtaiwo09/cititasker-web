import React, {Component} from 'react';
import {catchError, Naira} from "../../utils";
import {formatMoney} from "../../utils/helper";
import {FaArrowLeft, FaRegHandshake} from "react-icons/fa";
import {withRouter} from "react-router-dom";
import {AppService} from "../../services";
import {Input} from "reactstrap";
import {connect} from "react-redux";
import * as SweetAlert from 'sweetalert2'
import Spinner from "reactstrap/es/Spinner";
// import { PaystackConsumer } from 'react-paystack';
// const config = {
//     reference: (new Date()).getTime(),
//     email: "user@example.com",
//     amount: 20000,
//     publicKey: 'pk_test_dsdfghuytfd2345678gvxxxxxxxxxx',
// };

// function payWithPaystack({email, amount, phone, id}, success, error) {
//     var handler = PaystackPop.setup({
//         key: process.env.PAYSTACK_PUBLIC_KEY, email, amount: amount * 100,
//         currency: "NGN",
//         metadata: {
//             custom_fields: [
//                 {
//                     display_name: "Mobile Number",
//                     variable_name: "mobile_number",
//                     value: phone
//                 },
//                 {
//                     display_name: "Offer Id",
//                     variable_name: "offer_id",
//                     value: id
//                 }
//             ]
//         },
//         callback: function (response) {
//             if (success) success(response)
//         },
//         onClose: function () {
//             if (error) error()
//         }
//     });
//     handler.openIframe();
// }

class _SingleOffer extends Component {
    state = {
        rejection_comment: '',
        openRejection: false,
        openAccept: false,
        openComment: false,
        comment: '', comments: [],
        isLoading: false
    }

    componentDidMount(): void {
        const { offer} = this.props;
        this.setState({isLoading: true})
        AppService.getOfferComments(offer.id).then(({data}) => {
            this.setState({comments: data.data})
        }).catch(() => {
        }).finally(() => this.setState({isLoading: false}))
    }

    acceptOffer = () => {
        const {user, offer, } = this.props;

        SweetAlert.fire({
            title: 'Accept Offer?',
            text: `By accepting you are agree to pay a sum of ${Naira + formatMoney(offer.offer)} into your wallet\nYou can bargain with sender if you don't agree to this amount`,
            type: 'info',
            showCancelButton: true,
            confirmButtonText: 'Yes, I accept it!',
            cancelButtonText: 'Hold on'
        }).then((result) => {
            if (result.value) {
                const info = {email: user.email, amount: Number(offer.offer), phone: user.phone, id: offer.id};
                try {
                    window.payWithPaystack(info, (res) => {
                        this.setState({isLoading: true})
                        return AppService.acceptOffer(offer.id).then(({data}) => {
                            this.props.updateState({task: data.data || {}, showOffer: false})
                        }).catch(catchError).finally(() => this.setState({isLoading: false}))
                    }, () => {

                    })
                } catch (e) {

                    this.setState({isLoading: false})
                }
            }
        });

    };

    submitComment = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        AppService.sendOfferComment(formData).then(({data}) => {
            const input = document.getElementById("offer-comment");
            input.value = '';
            input.scrollIntoView();
            this.setState({comments: data.data})
        }).catch(() => {
        })
    };

    render() {
        const {user, offer, hideAccept} = this.props;
        const {comment, isLoading, comments} = this.state;
        return (
            <div className="w-100 d-flex  card mb-2 p-3 radius-8">
                <div className="w-100 d-flex flex-row ">
                    <img src={offer.user.avatar_url} alt="data.user.last_name" style={{borderRadius: 32}}
                         width="32" height="32"/>
                    <div className="ml-3" style={{flex: 1}}>
                        <div>
                            <a href="./#"
                               className="mt-auto"><span>By {offer.user.last_name + " " + offer.user.first_name}</span></a>
                        </div>
                        <div style={{backgroundColor: '#f1f2f3'}} className="p-1 mb-1">
                            <p className="fs-14">{offer.reason}</p>
                        </div>
                        <div className="spaced aligned mb-2">
                            <div>
                                <span className="text-warning">Proposed Amount {Naira + formatMoney(offer.offer)}</span>
                            </div>
                            <div className="aligned fs-18">
                                {!hideAccept &&
                                <button onClick={this.acceptOffer} title="Accept Offer"
                                        className="btn btn-sm btn-round  fs-12 btn-success text-white">
                                    {isLoading ? <Spinner size="small"/> :
                                        <><FaRegHandshake className="fs-18"/> Accept Offer</>}
                                </button>
                                }

                                {offer.selected === 1 && <span className="text-success fs-12 font-italic">ASSIGNED</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-100">
                    <hr className="my-1 p-0"/>
                    <span className="ff-700">SHORT CONVERSATION</span>
                    {comments.map(c => <div className="aligned mt-2">
                        <img alt="..." src={c.user && c.user.avatar_url} className="userProfile"/>
                        <div className="ml-3 p-0 mb-0">
                            <div className="text-gray-400 fs-10">{c.created_at}</div>
                            <div className="fs-12">{c.comment}</div>
                        </div>
                    </div>)}


                    <div className="d-flex al mt-3">
                        <div>
                            <img alt="..."
                                 src={user && user.avatar_url} className="userProfile"/>
                        </div>
                        <form style={{flex: 'auto'}} onSubmit={this.submitComment}>
                            <div style={{flex: 'auto', borderRadius: 6}}
                                 className="ml-3 p-2 card">
                                <input hidden value={offer.id} name="offer_id"/>
                                <Input
                                    placeHolder={'Send a comment'}
                                    type="input" name="comment"

                                    maxLength={150} id="offer-comment"
                                    onChange={e => this.setState({comment: e.target.value})}
                                    className="form-control border-1"/>
                                <div className="aligned mt-2  spaced">
                                    <span className="fs-10 font-italic">{150 - comment.length} words left</span>
                                    <button type={"submit"}
                                            className="btn-white btn-sm btn-round btn ml-3 ">
                                        Send
                                    </button>
                                </div>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export const SingleOffer = connect(({User: user}) => ({user}))(withRouter(_SingleOffer))

function Offers(props) {
    const {task} = props;
    return <div className="col-sm-12 pt-5">
        <div className="aligned spaced my-2 mx-3 flex-row card p-2"
             style={{position: 'absolute', top: 0, right: 0, left: 0}}>
            <button className="btn btn-primary btn-sm  btn-round"
                    onClick={() => props.updateState({showOffer: false})}><FaArrowLeft/> &nbsp; View Task
            </button>
            <span className="fs-16 ff-700 p-0 m-0">TASK BUDGET {Naira + formatMoney(task.budget)}</span>
        </div>

        <div className="pt-3">
            {task && task.offers && task.offers.map((offer, index) =>
                <SingleOffer hideAccept={task.status !== 'OPEN'} updateState={props.updateState} offer={offer}/>)}
            {!task.offers && <p className="fs-14 fw-300">No offer yet</p>}
        </div>

    </div>;
}

export default withRouter(Offers);
