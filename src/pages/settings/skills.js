import React, {Component} from "react";
import UserLayout from "../../layouts/UserLayout";
import {Progress, Row} from "reactstrap";
import {connect} from "react-redux";
import {setUser, updateProfile, updateProfileDetails} from "../../store/modules/auth";
import {isNull} from "../../utils";


class SkillScreen extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {...this.props.user,};
    }

    processSubmit = (e) => {
        e.preventDefault();
        this.props.updateProfileDetails(new FormData(e.target));
    };

    updateUserDetails = (nodeUpdate) => {
        const user = this.props.user;
        if (user.userdetail) {
            user.userdetail = {...user.userdetail, ...nodeUpdate};
        } else {
            user.userdetail = {...nodeUpdate}
        }
        this.props.setUser(user);
    };


    skillProgress() {
        const {user} = this.props;
        if (!user.userdetail) return 0;
        const checkers = Object.keys(user.userdetail);
        const except = ['created_at', 'updated_at', 'id', 'user_id', 'resume', 'portfolio_files'];
        except.forEach(key => {
            if (checkers.includes(key)) {
                checkers.splice(checkers.indexOf(key), 1);
            }
        });
        let progress = 0;
        checkers.forEach((key) => {
            if (!isNull(user.userdetail[key])) {
                progress += (100 / checkers.length)
            }
        });
        return Math.round(progress, 0)
    }

    getProfileProgressColor() {
        const va = this.skillProgress();
        return va < 21 ? 'error' : va < 61 ? 'warning' : va < 81 ? 'info' : 'success'
    }

    render() {
        const {user} = this.props;
        const details = user.userdetail || {transport: []};
        return (
            <UserLayout>
                <div className=" user-profile ff-700 ">
                    <div
                        className="px-4 d-sm-flex border-bottom d-block justify-content-sm-between align-items-sm-center">
                        <h5>Skills</h5>
                        <div className="profile-complete">
                            <div>Your skill progress is {this.skillProgress()}% complete</div>
                            <Progress color={this.getProfileProgressColor()} value={this.skillProgress()}/>
                        </div>
                    </div>
                    <form id="myForm" encType="multipart/form-data" method="post" onSubmit={this.processSubmit}
                          className="p-4 w-100">
                        <div className="mb-3">
                            These are your skills. Keep them updated with any new skills you learn so other members can
                            know what you can offer.
                        </div>


                        <div className="row">
                            <div className="col-sm-9 ">
                                <div className="form-group">
                                    <label htmlFor="skill"> What are you good at?</label>
                                    <input
                                        className="form-control" type="text" id="skill"
                                        placeholder="e.g. cleaning, driving and graphic design"
                                        value={details.skill} name="skill"
                                        onChange={(e) => this.updateUserDetails({skill: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> How do you get around?</label>
                                    <Row className="px-3">
                                        <div className="custom-control custom-control-alternative  custom-checkbox">

                                            <input
                                                className="custom-control-input" id="s_1" type="checkbox"
                                                name="transport[]" value="bicycle"
                                                checked={details.transport && details.transport.includes('bicycle')}
                                                onChange={(e) => {
                                                    let transport = details.transport;
                                                    if (transport.includes('bicycle')) {
                                                        transport.splice(transport.indexOf('bicycle'), 1)
                                                    } else {
                                                        transport.push('bicycle');
                                                    }
                                                    this.updateUserDetails({transport})
                                                }}
                                            />

                                            <label className="custom-control-label" htmlFor="s_1">
                                                <span>Bicycle</span>
                                            </label>
                                        </div>
                                        <div className="custom-control ml-4 custom-control-alternative custom-checkbox">
                                            <input
                                                className="custom-control-input" id="s_2" type="checkbox"
                                                name="transport[]" value="car"
                                                checked={details.transport && details.transport.includes('car')}
                                                onChange={(e) => {
                                                    let transport = details.transport;

                                                    if (transport.includes('car')) {
                                                        transport.splice(transport.indexOf('car'), 1)
                                                    } else {
                                                        transport.push('car');
                                                    }
                                                    this.updateUserDetails({transport})
                                                }}
                                            />
                                            <label className="custom-control-label" htmlFor="s_2">
                                                <span>Car</span>
                                            </label>
                                        </div>
                                        <div className="custom-control ml-4 custom-control-alternative custom-checkbox">
                                            <input
                                                className="custom-control-input" id="s_3" type="checkbox"
                                                name="transport[]" value="online"
                                                checked={details.transport && details.transport.includes('online')}
                                                onChange={(e) => {
                                                    let transport = details.transport;
                                                    if (transport.includes('online')) {
                                                        transport.splice(transport.indexOf('online'), 1)
                                                    } else {
                                                        transport.push('online');
                                                    }
                                                    this.updateUserDetails({transport})
                                                }}
                                            />
                                            <label className="custom-control-label" htmlFor="s_3">
                                                <span>Online</span>
                                            </label>
                                        </div>
                                        <div className="custom-control ml-4 custom-control-alternative custom-checkbox">
                                            <input
                                                className="custom-control-input" id="s_4" type="checkbox"
                                                name="transport[]" value="keke"
                                                checked={details.transport && details.transport.includes('keke')}
                                                onChange={(e) => {
                                                    let transport = details.transport;
                                                    if (transport.includes('keke')) {
                                                        transport.splice(transport.indexOf('keke'), 1)
                                                    } else {
                                                        transport.push('keke');
                                                    }
                                                    this.updateUserDetails({transport})
                                                }}
                                            />
                                            <label className="custom-control-label" htmlFor="s_4">
                                                <span>Keke</span>
                                            </label>
                                        </div>
                                        <div className="custom-control ml-4 custom-control-alternative custom-checkbox">
                                            <input
                                                className="custom-control-input" id="s_5" type="checkbox"
                                                name="transport[]" value="truck"
                                                checked={details.transport && details.transport.includes('truck')}
                                                onChange={(e) => {
                                                    let transport = details.transport;
                                                    console.log(transport)

                                                    if (transport.includes('truck')) {
                                                        transport.splice(transport.indexOf('truck'), 1)
                                                    } else {
                                                        transport.push('truck');
                                                    }
                                                    this.updateUserDetails({transport})
                                                }}
                                            />
                                            <label className="custom-control-label" htmlFor="s_5">
                                                <span>Truck</span>
                                            </label>
                                        </div>
                                        <div className="custom-control ml-4 custom-control-alternative custom-checkbox">
                                            <input
                                                name="transport[]" value="walk"
                                                className="custom-control-input" id="walk"
                                                checked={details.transport && details.transport.includes('walk')}

                                                onChange={(e) => {
                                                    let transport = details.transport;

                                                    if (transport.includes('walk')) {
                                                        transport.splice(transport.indexOf('walk'), 1)
                                                    } else {
                                                        transport.push('walk');
                                                    }
                                                    this.updateUserDetails({transport})
                                                }}
                                                type="checkbox"/>
                                            <label className="custom-control-label" htmlFor="walk">
                                                <span>Walk</span>
                                            </label>
                                        </div>
                                    </Row>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="language">What languages can you speak/write?</label>
                                    <input
                                        id="language" className="form-control"
                                        placeholder="e.g. English and French" type="text"
                                        value={details.language} name="language"
                                        onChange={(e) => this.updateUserDetails({language: e.target.value})}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="education">What qualifications have you</label>
                                    <input
                                        id="education" className="form-control" type="text"
                                        placeholder="e.g. Higher School Certificate (HSC), Accredited Barista"
                                        value={details.qualification} name="qualification"
                                        onChange={(e) => this.updateUserDetails({qualification: e.target.value})}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="experience"> What's your work experience?</label>
                                    <input
                                        id="experience" className="form-control"
                                        placeholder="e.g. 3 years as a Barista at The Cafe" type="text"
                                        value={details.experience} name="experience"
                                        onChange={(e) => this.updateUserDetails({experience: e.target.value})}
                                    />
                                </div>


                                <div>
                                    <button
                                        type="submit"
                                        className="btn-success mt-3 fs-12 fw-700 ff-700  btn btn-round">
                                        Save Skills
                                    </button>
                                </div>
                                <div className="clearfix"/>
                            </div>
                        </div>
                    </form>
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = ({Auth, User: user, Application}) => {
    return {...Auth, user}
}

export default connect(mapStateToProps, {updateProfile, updateProfileDetails, setUser})(SkillScreen);
