import React, {Component} from "react";
import UserLayout from "../../layouts/UserLayout";
import {Row} from "reactstrap";
import Col from "reactstrap/es/Col";
import {connect} from "react-redux";
import {fetchUser, setUser, updateProfile} from "../../store/modules/auth";
import {UpdatePhoneNumber} from "../../components/Common";


class MobileEdit extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {...this.props.user,};
    }

    processSubmit = (e) => {
        e.preventDefault();
        this.props.updateProfile(new FormData(e.target));
    };
    updateUser = (nodeUpdate) => this.props.setUser({...nodeUpdate});

    render() {
        const {user, fetchUser} = this.props;
        return (
            <UserLayout>
                <div className=" user-profile ff-500  fs-14">
                    <div
                        className="px-4 d-sm-flex border-bottom d-block justify-content-sm-between align-items-sm-center">
                        <h5>Mobile</h5>

                    </div>
                    <div className="p-4 w-100">
                        <div className="mb-3">
                            Let's have those digits! We'll keep you up to date about the latest happenings on your tasks
                            by SMS.
                            <br/>
                            <br/>
                            Mobile number <br/>
                            We will send you a verification code
                            <Row className="mt-4">
                                <Col sm={8} className="aligned">
                                    <UpdatePhoneNumber updateUser={this.updateUser} user={user} onDone={fetchUser}/>

                                    {/*    <input*/}
                                    {/*        className="form-control" name="phone"*/}
                                    {/*        onChange={(e) => this.updateUser({phone: e.target.value})}*/}
                                    {/*        placeholder="08123456789" type="tel" value={user.phone}*/}
                                    {/*        style={{width: 150, height: 35}}/>*/}
                                    {/*    <button type="submit" className="btn-sm ml-2 btn-round btn btn-success">*/}
                                    {/*        Send*/}
                                    {/*    </button>*/}
                                </Col>
                            </Row>
                            <br/>
                            <small>
                                Verifying your mobile number helps us know you're a genuine human! We won't show it to
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

export default connect(mapStateToProps, {updateProfile, setUser, fetchUser})(MobileEdit);
