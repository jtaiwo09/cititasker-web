import React, {useEffect, useState} from 'react';
import {FaChevronLeft} from "react-icons/fa";
import {FiCheckCircle} from "react-icons/fi";
import {GrClose} from "react-icons/gr";
import {connect} from "react-redux";
import {Input, InputGroup, Modal, ModalBody, Spinner} from 'reactstrap';
import * as Swal from "sweetalert2";
import {AppService} from "../../services";
import {setAppState, toggleEditOffer} from "../../store/modules/app";
import {setUser, updateProfile, updateProfileDetails} from "../../store/modules/auth";
import {catchError, Naira} from "../../utils";
import {formatMoney} from "../../utils/helper";


function EditOffer({offer, task, setAppState, toggleEditOffer, className, editOffer}) {
    const [amount, setAmount] = useState(Number(offer ? offer.offer : 0));
    const [page, setPage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [reason, setReason] = useState('');
    useEffect(() => {
        setAmount(offer ? offer.offer : 0);
        setReason(offer ? offer.reason : '')
        setPage('')
    }, [editOffer, offer]);

    const renderPage = () => {
        let budget = offer ? offer.offer : 0;
        if (amount > 0) {
            budget = amount
        }
        let charge = Number.parseFloat(budget ? budget * 0.2 : 0).toFixed(2),
            // taskBudget = Number.parseFloat(task && task.budget ? task.budget : 0).toFixed(2),
            paid = Number.parseFloat(budget ? budget * 0.8 : 0).toFixed(2);
        if (page === 'send_offer') {
            return (
                <div>
                    <div className="py-5 d-flex central">
                        <div className="w-100">
                            <p className="p-0 fw-500 fs-14">Why are you the best person for this task?
                                <br/>
                                <span className="text-danger">Do not share your personal details</span>
                            </p>
                            <textarea className="form-control" value={reason} onChange={e => setReason(e.target.value)}
                                      rows={5}>{reason}</textarea>
                        </div>
                    </div>
                    <div className="w-100">
                        {/*<div className="spaced aligned">*/}
                        {/*    <span>Task Budget</span>*/}
                        {/*    <span><b>{Naira} {formatMoney(taskBudget)}</b></span>*/}
                        {/*</div>*/}

                        <div className="spaced aligned">
                            <span>Service Fee</span>
                            <span><b>{Naira} {formatMoney(charge)}</b></span>
                        </div>
                        <div className="spaced aligned">
                            <span>You will receive</span>
                            <span><b>{Naira} {formatMoney(paid)}</b></span>
                        </div>
                        <div className="text-center">
                            <span>Find how charge are made</span>
                        </div>


                    </div>
                </div>
            )
        }
        if (page === 'finished') {
            return (
                <div className="py-5 h-100 d-flex central">
                    <div className="w-100">
                        <div className="aligned flex-column justify-content-center"
                             style={{height: 380}}>

                            {isLoading ?
                                <Spinner color='success' size={90}/> :
                                <FiCheckCircle color='success' size={80}/>
                            }
                            <br/>
                            <h3>{isLoading ? 'In Progress' : 'You have successfully sent an offer'}</h3>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="h-100 central w-100 flex-column">
                <div className="py-5 d-flex central">
                    <div className="w-100 text-center">
                        <p className="p-0 fw-bold">Your Offer</p>
                        <InputGroup
                            className="input-group-alternative px-3 aligned input-group " style={{width: 200}}>
                            <span>{Naira}</span>
                            <Input
                                name={"amount"} min={1}
                                type="number" value={amount} onChange={e => setAmount(e.target.value)}
                                className="mr-0 flex-fill pl-2"
                            />
                        </InputGroup>
                    </div>
                </div>
                <div className="w-100 ">
                    <div className="spaced aligned">
                        <span>Service Fee</span>
                        <span><b>{Naira} {formatMoney(charge)}</b></span>
                    </div>
                    <div className="spaced aligned">
                        <span>You will receive</span>
                        <span><b>{Naira} {formatMoney(paid)}</b></span>
                    </div>
                    <div className="text-center mt-3">
                        <span>Find how charge are made</span>
                    </div>
                </div>
            </div>
        )
    };

    const processRequest = () => {
        if (!['offer', 'send_offer', 'finished', ''].includes(page)) {
            return setPage('');
        }
        let budget = task ? task.budget : 0;
        let chargeable = Number.parseFloat(budget ? budget * 0.5 : 0);

        if (page === '') {
            if (amount < chargeable) {
                return Swal.fire('Alert !!!', `Amount can not be less than ${Naira + '' + chargeable}`, 'warning')
            }
            return setPage('send_offer');
        }

        if (page === 'send_offer') {
            if (!isLoading) {
                setIsLoading(true)
                const dt = {offer: amount, reason, id: offer.id}
                AppService.editOffer(dt)
                    .then((res) => {
                        setIsLoading(false)
                        return setPage('finished');
                    }).catch(catchError);
            }

            return
        }

        if (page === 'finished') {
            if(window.hasOwnProperty('loadCurrentTask')){
                window.loadCurrentTask()
            }
            return setAppState({editOffer: false});
        }
    };

    return (
        <Modal isOpen={editOffer} toggle={() => toggleEditOffer()} className={className} backdrop={'static'} keyboard>
            <div className="d-flex justify-content-between align-items-center w-100 px-4 py-4">
                {!['', 'finished'].includes(page) &&
                <FaChevronLeft className="fs-22" onClick={() => setPage('')}/>}
                <h3 className="mx-auto mb-0">Edit Offer</h3>
                <GrClose onClick={() => toggleEditOffer()} className="fs-22"/>
            </div>
            <ModalBody className="py-2">
                <div className="w-100 " style={{minHeight: '50vh'}}>
                    {renderPage()}
                </div>
                <div className="w-100 pb-3 text-center">
                    <button onClick={processRequest} className="btn btn-round w-75 mt-4 mx-auto btn-outline-info">
                        {page === 'finished' ? 'Close' : page === '' ? 'Continue' :
                            ['offer', 'send_offer'].includes(page) ? 'Next' : 'Back'}
                    </button>
                </div>
            </ModalBody>
        </Modal>
    );

}

export default connect(({Application: {editOffer, offer, showOffer, task}, User: user}) => ({
    editOffer, showOffer, user, task, offer
}), {toggleEditOffer, setAppState, updateProfileDetails, setUser, updateProfile})(EditOffer);

