import {Formik} from "formik";
import React, {Component} from 'react';
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {FiCheckCircle} from "react-icons/fi";
import {GrClose} from "react-icons/gr";
import {IoIosCheckmarkCircle} from "react-icons/io";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import {Input, InputGroup, Modal, ModalBody, Spinner} from 'reactstrap';
import * as Swal from "sweetalert2";
import * as Yup from "yup";
import {AppService, AuthService} from "../../services";
import {setAppState, toggleOffer} from "../../store/modules/app";
import {fetchUser, setUser, updateProfile, updateProfileDetails} from "../../store/modules/auth";
import {catchError, Naira} from "../../utils";
import {SERVER} from "../../utils/EndPoints";
import {formatMoney, isNull} from "../../utils/helper";
import {FormField, FormSelect} from "../FormElements";
import {UpdatePhoneNumber} from "../Common";

let AppState, acct_name = '';

function ActionButton(props) {
    return <div className="w-100 mb-3">
        <p className="fs-14 p-0 m-0">{props.title}</p>
        <div className="account_status_div" onClick={props.onClick}>
            <div className="aligned">
                <IoIosCheckmarkCircle className={`fs-24 p-0 ${props.enabled ? 'text-success' : 'text-gray'}`}/>
                <span className="p-0 ml-1 fs-14">{props.text}</span>
            </div>
            <FaChevronRight/>
        </div>
    </div>;
}

const banks = [
    {"id": "0", "name": "Select a Bank", "code": ""},
    {"id": "1", "name": "Access Bank", "code": "044"},
    {"id": "2", "name": "Citibank", "code": "023"},
    {"id": "3", "name": "Diamond Bank", "code": "063"},
    {"id": "4", "name": "Dynamic Standard Bank", "code": ""},
    {"id": "5", "name": "Ecobank Nigeria", "code": "050"},
    {"id": "6", "name": "Fidelity Bank Nigeria", "code": "070"},
    {"id": "7", "name": "First Bank of Nigeria", "code": "011"},
    {"id": "8", "name": "First City Monument Bank", "code": "214"},
    {"id": "9", "name": "Guaranty Trust Bank", "code": "058"},
    {"id": "10", "name": "Heritage Bank Plc", "code": "030"},
    {"id": "11", "name": "Jaiz Bank", "code": "301"},
    {"id": "12", "name": "Keystone Bank Limited", "code": "082"},
    {"id": "13", "name": "Providus Bank Plc", "code": "101"},
    {"id": "14", "name": "Polaris Bank", "code": "076"},
    {"id": "15", "name": "Stanbic IBTC Bank Nigeria Limited", "code": "221"},
    {"id": "16", "name": "Standard Chartered Bank", "code": "068"},
    {"id": "17", "name": "Sterling Bank", "code": "232"},
    {"id": "18", "name": "Suntrust Bank Nigeria Limited", "code": "100"},
    {"id": "19", "name": "Union Bank of Nigeria", "code": "032"},
    {"id": "20", "name": "United Bank for Africa", "code": "033"},
    {"id": "21", "name": "Unity Bank Plc", "code": "215"},
    {"id": "22", "name": "Wema Bank", "code": "035"},
    {"id": "23", "name": "Zenith Bank", "code": "057"}
];


class AccountStatus extends Component<{}> {

    state = {
        step: 0, inPerson: true,
        view: '', amount: 0, offerMessage: '', account_name: '',
        avatar: this.props.user.avatar_url, dob: this.props.user && this.props.user.dob &&
            this.props.user.dob.replace(' 00:00:00', ''), isLoading: false
    };

    componentDidMount(): void {
        AppState = this;
        const user = this.props.user;
        const bankValid = this.checkValidity(['account_name', 'account_bank', 'account_bvn', 'account_number']);
        const validAddress = this.checkValidity(['address', 'landmark', 'postal_code', 'state']);
        if (!isNull(user.dob) && !isNull(user.phone) && !isNull(user.avatar_url) && user.avatar_url !== SERVER.replace('api', '') + '/6.jpg' && bankValid && validAddress) {
            return this.setState({view: 'offer'});
        }
    }

    onSelectAvatar = (e) => {
        if (e.target.files && e.target.files[0]) {
            document.getElementById('avatar_pic').src
                = window.URL.createObjectURL(e.target.files[0]);
            AppState.setState({avatar: e.target.files[0]});
            return
        }
        toast.warning('A file must be attached');
    };

    updateUser = (nodeUpdate) => this.props.setUser({...nodeUpdate});

    updateUserDetails = (nodeUpdate) => {
        const user = this.props.user;
        if (user.userdetail) {
            user.userdetail = {...user.userdetail, ...nodeUpdate};
        } else {
            user.userdetail = {...nodeUpdate}
        }
        this.props.setUser(user);
    };

    checkValidity = (list) => {
        let validity = false;
        const {user: {userdetail}} = this.props;
        if (userdetail) {
            list.forEach((e) => {
                validity = !isNull(userdetail[e])
            })
        }
        return validity
    };

    renderView = () => {
        const {user,} = this.props;
        const {view, amount,} = this.state;
        const {task} = this.props;
        let dob = '';
        if (user) {
            try {
                if (user.hasOwnProperty('dob'))
                    dob = user.dob.replace(' 00:00:00', '');
            } catch (e) {
            }
        }
        let budget = task ? task.budget : 0;

        if (amount > 0) {
            budget = amount
        }
        let charge = Number.parseFloat(budget ? budget * 0.2 : 0).toFixed(2),
            // taskBudget = Number.parseFloat(task && task.budget ? task.budget : 0).toFixed(2),
            paid = Number.parseFloat(budget ? budget * 0.8 : 0).toFixed(2);
        const bankValid = this.checkValidity(['account_name', 'account_bank', 'account_bvn', 'account_number']);
        const validAddress = this.checkValidity(['address', 'landmark', 'postal_code', 'state']);

        if (view === 'picture') {
            return (
                <div className="form-group">
                    <div className="aligned">
                        <div style={{width: 50, height: 50,}}>
                            <input
                                accept="image/*"
                                id="avatar" onChange={this.onSelectAvatar}
                                name="avatar" hidden type="file"/>
                            <img
                                alt="avatar" style={{width: '100%', borderRadius: 7, height: '100%'}}
                                id="avatar_pic"
                                src={this.state.avatar || user.avatar_url}/>
                        </div>
                        <div className="ml-3">
                            <input type="file" hidden name=""/>
                            <button type="button" onClick={() => {
                                document.getElementById('avatar').click()
                            }} className="btn btn-sm fs-10 ff-700 fw-700  btn-round btn-success">
                                Upload photo
                            </button>
                        </div>
                    </div>
                </div>
            );
        }


        if (view === 'dob') {
            return (
                <div className="aligned">
                    <Input
                        onChange={(e) => this.updateUser({dob: e.target.value})}
                        type="date" value={dob} max="2003-12-31"
                        name="dob" className="form-control w-50"
                        placeholder="date placeholder"
                    />

                    <button type="button" onClick={() => {
                        if (isNull(dob)) {
                            return Swal.fire('Error', 'Date of birth is required', 'error')
                        }
                        AuthService.update({dob})
                            .then(({data}) => {
                                Swal.fire('Success', 'Updated successfully', 'success')
                                this.props.setUser(data.data || {})
                                this.setState({view: ''})
                            }).catch((error) => {
                            Swal.fire('Error', 'Something went wrong', 'error')
                        })

                    }}
                            className="btn btn-md fs-12 ml-2 ff-700 fw-700  btn-round btn-success">
                        Save Birthday
                    </button>
                </div>
            );
        }

        if (view === 'phone') {
            return (<UpdatePhoneNumber
                updateUser={this.updateUser}
                onDone={() => {
                    this.setState({view: ''})
                    this.props.fetchUser()
                }}
                user={this.props.user}/>);
        }
        if (view === 'bank') {
            return (
                <div>
                    <Formik
                        initialValues={{...(user.userdetail ? user.userdetail : {}), account_name: '', account_bvn: ''}}
                        // enableReinitialize
                        validationSchema={Yup.object().shape({
                            account_name: Yup.string().required('Account Name cannot be empty'),
                            account_bank: Yup.string().required('Bank Name is required'),
                            account_bvn: Yup.string().required('BVN must be 11 digits'),
                            account_number: Yup.string().required('Account number is required'),
                        })}
                        onSubmit={({account_name, account_bank, account_bvn, account_number}, action) => {
                            AuthService.updateDetails({account_name, account_bank, account_bvn, account_number})
                                .then(({data}) => {
                                    Swal.fire('Success', 'Updated successfully', 'success')
                                    this.props.setUser(data.data || {});
                                    this.setState({view: ''})

                                }).catch((error) => {
                                Swal.fire('Error', 'Something went wrong', 'error')
                            })
                        }}
                    >

                        {(props) => (
                            <form onSubmit={props.handleSubmit}>

                                <p className="fs-14">Please provide your bank details so you can get paid. We don't
                                    take any money
                                    from your account.</p>

                                <FormSelect type="text" name="account_bank" title="Bank Name">
                                    {banks.map((bank) =>
                                        <option key={bank.code} value={bank.code}>{bank.name}</option>)}
                                </FormSelect>

                                <FormField type="text" name="account_number"
                                           onInput={function (element) {
                                               var regex = /[^0-9]/gi;
                                               if (element.target.value)
                                                   element.target.value = element.target.value.replace(regex, "");
                                               const bank = document.getElementById('account_bank').value;
                                               if (element.target.value.length === 10 && bank) {
                                                   AppService.verifyBankInfo(element.target.value, bank).then(({data}) => {
                                                       if (data.status) {
                                                           acct_name = data && data.data && data.data.account_name
                                                       }
                                                       document.getElementById('account_name').value = acct_name
                                                       props.setFieldValue('account_name', acct_name, false)
                                                   }).catch(() => {

                                                   })
                                               }
                                           }}
                                           pattern="\d*" maxLength={10} max={10}
                                           placeholder="Account Number"
                                           innerClass="col-sm-8 px-0" title="Account Number"/>

                                <FormField type="text" name="account_name" disabled placeholder="Account Name"
                                           title="Account Name"/>
                                <FormField type="number" title="BVN"
                                           innerClass="col-sm-8 px-0" name="account_bvn" maxLenght={11}
                                           placeholder="Bank Verification Code"/>

                                <button type="submit"
                                        className="btn btn-md fs-12 mt-2 ff-700 fw-700  btn-round btn-success">
                                    Save Bank Details
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            );
        }
        if (view === 'location') {
            return (
                <div>
                    <Formik
                        initialValues={user.userdetail}
                        validationSchema={Yup.object().shape({
                            address: Yup.string().min(2, 'Address is too Short!').required('Address is required'),
                            // address2: Yup.string().notRequired(),
                            landmark: Yup.string().required('City is required'),
                            state: Yup.string().required('State Name is required'),
                            // postal_code: Yup.required('Postal Code is required'),
                        })}
                        onSubmit={({address, address2, landmark, state, postal_code}) => {
                            AuthService.updateDetails({address, address2, landmark, state, postal_code})
                                .then(({data}) => {
                                    Swal.fire('Success', 'Updated successfully', 'success')
                                    this.props.setUser(data.data || {})
                                    this.setState({view: ''})
                                }).catch((error) => {
                                Swal.fire('Error', 'Something went wrong', 'error')
                            })
                        }}
                    >

                        {({handleSubmit, handleChange, handleBlur, values, errors,}) => (
                            <form onSubmit={handleSubmit}>

                                <p className="fs-14">Your billing address will be verified before you can receive
                                    payments.</p>

                                <FormField type="text" name="address" title="Address Line"/>
                                <FormField type="text" name="address2" title="Address Line 2 (optional)"/>
                                <FormField type="text" name="landmark" title="City"/>
                                <FormField type="text" name="state" title="State"/>
                                <FormField type="number" name="postal_code" maxLength={6} title="Postal Code"/>

                                <p className="fs-10">
                                    Your address will never be shown publicly, it is only used for account
                                    verification purposes.
                                </p>

                                <button type="submit"
                                        className="btn btn-md fs-12 mt-2 ff-700 fw-700  btn-round btn-success">
                                    Add Billing Address
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            );
        }

        if (view === 'offer') {
            return (
                <div className="h-100 central bg-gray-100 w-100 flex-column">

                    <div className="py-5 d-flex central">
                        <div className="w-100 text-center">
                            <p className="p-0 fw-bold">Your Offer</p>
                            <InputGroup
                                className="input-group-alternative px-3 aligned input-group " style={{width: 250}}>
                                <span>{Naira}</span>
                                <Input
                                    name={"amount"} min={2000}
                                    type="number" value={this.state.amount}
                                    onChange={e => this.setState({amount: e.target.value})}
                                    className="mr-0 flex-fill pl-2"
                                />
                            </InputGroup>
                            <div className="fs-12 py-2 text-center">Minimum Amount you can charge is {Naira}2000</div>
                        </div>
                    </div>
                    <div className="w-100 ">
                        {/*<div className="spaced aligned">*/}
                        {/*    <span>Task Budget</span>*/}
                        {/*    <span><b>{Naira} {formatMoney(taskBudget)}</b></span>*/}
                        {/*</div>*/}
                        {/*<div className="spaced aligned">*/}
                        {/*    <span>Task Budget</span>*/}
                        {/*    <span><b>{Naira} {formatMoney(taskBudget)}</b></span>*/}
                        {/*</div>*/}
                        {/*<hr/>*/}
                        <div className="spaced aligned">
                            <span>Service Fee</span>
                            <span><b>{Naira} {formatMoney(charge)}</b></span>
                        </div>
                        <hr/>
                        <div className="spaced aligned">
                            <span>You will receive</span>
                            <span><b>{Naira} {formatMoney(paid)}</b></span>
                        </div>
                        <div className="text-center mt-3">
                            {/*<span>Find how charge are made</span>*/}
                        </div>
                    </div>
                </div>
            )
        }
        if (view === 'send_offer') {
            return (
                <div>
                    <div className="py-5 d-flex central">
                        <div className="w-100">
                            <p className="p-0 fw-500 fs-14">Why are you the best person for this task?
                                <br/>
                                <span className="text-danger">Do not share your personal details</span>
                            </p>
                            <textarea
                                className="form-control"
                                onChange={e => this.setState({offerMessage: e.target.value})}
                                rows={5}/>
                        </div>
                    </div>
                    <div className="w-100">
                        <div className="spaced aligned">
                            <span>Your Offer</span>
                            <span><b>{Naira} {formatMoney(budget)}</b></span>
                        </div>
                        <hr/>
                        <div className="spaced aligned">
                            <span>Service Fee</span>
                            <span><b>{Naira} {formatMoney(charge)}</b></span>
                        </div>
                        <hr/>

                        <div className="spaced aligned">
                            <span>You will receive</span>
                            <span><b>{Naira} {formatMoney(paid)}</b></span>
                        </div>
                        <div className="text-center">
                            {/*<span>Find how charge are made</span>*/}
                        </div>
                    </div>
                </div>
            )
        }
        if (view === 'finished') {
            return (
                <div className="py-5 h-100 d-flex central">
                    <div className="w-100">
                        <div className="aligned flex-column justify-content-center"
                             style={{height: 380}}>

                            {
                                this.state.isLoading ?
                                    <Spinner color='success' size={90}/> :
                                    <FiCheckCircle color='success' size={80}/>
                            }
                            <br/>
                            <h3>{this.state.isLoading ? 'In Progress' : 'You have successfully sent an offer'}</h3>
                        </div>
                    </div>
                </div>
            )
        }

        return (


            <>
                <ActionButton
                    title="Upload a profile picture " text="Profile photo set"
                    onClick={() => this.setState({view: 'picture'})}
                    enabled={!isNull(user.avatar_url) && user.avatar_url !== SERVER.replace('api', '') + '/6.jpg'}
                />
                <ActionButton
                    title="Bank account details "
                    text="Enter your account details"
                    onClick={() => this.setState({view: 'bank'})}
                    enabled={bankValid}
                />
                <ActionButton
                    title="Enter home address" text="Full Address details City"
                    onClick={() => this.setState({view: 'location'})}
                    enabled={validAddress}
                />
                <ActionButton
                    title="Provide date of birth" text="DD/MM/YY"
                    onClick={() => this.setState({view: 'dob'})}
                    enabled={!isNull(user.dob)}
                />

                <ActionButton
                    title="Provide a mobile number" text="Enter your phone number"
                    onClick={() => this.setState({view: 'phone'})}
                    enabled={!isNull(user.phone)}
                />
            </>
        );
    };

    processRequest = () => {
        const {view, amount,} = this.state;
        const {user,} = this.props;
        if (!['offer', 'send_offer', 'finished', ''].includes(view)) {
            this.setState({view: ''});
            return
        }
        // let budget = task ? task.budget : 0;
        let chargeable = 2000;// Number.parseFloat(budget ? budget * 0.5 : 0);


        const bankValid = this.checkValidity(['account_name', 'account_bank', 'account_bvn', 'account_number']);
        const validAddress = this.checkValidity(['address', 'landmark', 'postal_code', 'state']);
        if (!bankValid) {
            return Swal('Alert', 'Bank details not completed', 'warning')
        }

        if (!validAddress) {
            return Swal('Alert', 'Address details not completed', 'warning')
        }
        if (isNull(user.phone)) {
            return Swal('Alert', 'Update your phone number', 'warning')
        }
        if (isNull(user.dob)) {
            return Swal('Alert', 'Update your date of birth', 'warning')
        }

        if (view === '') {
            return this.setState({view: 'offer'});
        }
        if (view === 'offer') {
            if (amount < chargeable) {
                return Swal.fire('Alert !!!', `Amount can not be less than ${Naira + '' + chargeable}`, 'warning')
            }
            return this.setState({view: 'send_offer'});
        }

        if (view === 'send_offer') {
            if (!this.state.isLoading) {
                this.setState({isLoading: true})
                const {task} = this.props;
                AppService.sendOffer(task.id, {offer: this.state.amount, reason: this.state.offerMessage})
                    .then((res) => {
                        return this.setState({view: 'finished'});
                    }).catch(catchError).finally(() => {
                    this.setState({isLoading: false})
                });
            }
            return
        }

        if (view === 'finished') {
            this.props.setAppState({showOffer: false});
            if (window.hasOwnProperty('loadCurrentTask')) {
                window.loadCurrentTask()
            }
            return
        }
    };

    render() {
        const {toggleOffer, showOffer, className} = this.props;
        const {view, isLoading} = this.state;
        return (
            <>
                <Modal isOpen={showOffer} toggle={toggleOffer} className={className} backdrop={'static'}
                       keyboard>
                    <div className="d-flex justify-content-between align-items-center w-100 px-4 py-4">
                        {!['', 'finished'].includes(view) &&
                        <FaChevronLeft className="fs-22"
                                       onClick={() => this.setState({view: ''})}/>}
                        <h3 className="mx-auto mb-0">{view === '' ? "Setup your account" : 'Make an offer'}</h3>
                        <GrClose onClick={toggleOffer} className="fs-22"/>
                    </div>
                    <ModalBody className="py-2">
                        <div className="w-100 " style={{minHeight: '50vh'}}>
                            {this.renderView()}
                        </div>
                        <div className="w-100 pb-3 text-center">
                            <button onClick={this.processRequest}
                                    className="btn btn-round w-75 mt-4 mx-auto btn-outline-info">
                                {isLoading ? <Spinner/> : view === 'finished' ? 'Close' : view === ''
                                    ? 'Continue' : ['offer', 'send_offer'].includes(view)
                                        ? 'Submit Offer' : 'Back'}
                            </button>
                        </div>
                    </ModalBody>
                </Modal>
            </>
        );
    }

}

export default connect(({Application: {showOffer, task, myOffer}, User: user}) => ({
    showOffer, user, task, myOffer
}), {
    toggleOffer, setAppState, fetchUser,
    updateProfileDetails, setUser, updateProfile
})(AccountStatus);

