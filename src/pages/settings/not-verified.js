import React, {Component} from "react";
import UserLayout from "../../layouts/UserLayout";
import {connect} from "react-redux";
import {fetchUser, setUser, updateProfile} from "../../store/modules/auth";
import Spinner from "reactstrap/es/Spinner";
import {AppService, AuthService} from "../../services";
import {catchError} from "../../utils";
import {toast} from "react-toastify";


class NotVerified extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {...this.props.user, isLoading: false, isLoadingVerification: false};
    }

    componentDidMount(): void {
        // this.props.fetchUser();
        this.checkVerification()
        // const {status} = this.props.match.params;
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props.user && this.props.user.is_verified) {
            this.props.history.replace("/account")
        }
    }

    resendMail = (e) => {
        e.preventDefault();
        this.setState({isLoading: true})
        AppService.resendVerification()
            .then(() => {
                toast.success('Mail Sent')
            })
            .catch(catchError)
            .finally(() => this.setState({isLoading: false}))
    };

    checkVerification = () => {
        this.setState({isLoadingVerification: true})
        AuthService.findById()
            .then(({data: {data: user}}) => {
                if (user.is_verified === 1) {
                    toast.success('Verified')
                    this.props.setUser(user);
                    return this.props.history.replace('/account')
                }
                toast.info('Not yet verified')
            })
            .catch(catchError)
            .finally(() => this.setState({isLoadingVerification: false}))
    };
    openMail = (e) => {
        e.preventDefault();
        let mail = 'https://mail.google.com';
        try{
            mail = this.props.user.email.split('@')[1];
        }catch (e){

        }
        window.open(mail, '_blank')
    };

    render() {
        const {isLoading, isLoadingVerification} = this.state;
        const {user} = this.props

        return (
            <UserLayout>
                <div className=" user-profile ff-500  fs-14">
                    <div
                        className="px-4 d-sm-flex border-bottom d-block justify-content-sm-between align-items-sm-center">
                        <h5>Account Verification</h5>

                    </div>
                    <div className="p-4 w-100">
                        <div className="mb-3">
                            Your profile account is yet to be verified. Check your email {user ? user.email : ''} for
                            the verification mail sent
                            to you.
                            <br/>
                            You can also check your spam box
                            <br/>
                            <br/>
                            <div>
                                <button onClick={this.checkVerification} disabled={isLoadingVerification}
                                        className="btn btn-round btn-primary">
                                    {isLoadingVerification && <Spinner size="small"/>}&nbsp;&nbsp;CHECK VERIFICATION
                                    STATUS
                                </button>
                                &nbsp;
                                <button onClick={this.openMail} className="btn btn-round btn-info">
                                    OPEN YOUR MAIL
                                </button>
                                &nbsp;
                                <button onClick={this.resendMail} disabled={isLoading}
                                        className="btn btn-round btn-success">
                                    {isLoading && <Spinner size="small"/>}&nbsp;&nbsp;RESEND VERIFICATION MAIL
                                </button>
                            </div>
                            <br/>
                            <br/>
                            <small>
                                Verifying your account helps us know you're a genuine human! We won't share your details
                                with
                                anyone or sell it on to any 3rd party, it's just for us to send you some good stuff.
                            </small>
                        </div>
                    </div>


                </div>
            </UserLayout>
        );
    }
}


const mapStateToProps = ({Auth, User}) => ({...Auth, user: User});

export default connect(mapStateToProps, {updateProfile, setUser, fetchUser})(NotVerified);
