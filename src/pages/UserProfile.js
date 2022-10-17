import React, {Component} from "react";
import Layout from "../components/Layout";
import {connect} from 'react-redux'
import {login} from '../store/modules/auth'
import {AppService} from "../services";
import {catchError, isNull} from "../utils";
import Spinner from "reactstrap/es/Spinner";
import {Col, Row} from "reactstrap";
import {AiFillStar, AiOutlineMail, AiOutlinePhone} from "react-icons/all";
import {FaStar} from "react-icons/fa";

const StarRate = ({active, onPress}) =>
    <FaStar style={{color: active ? 'gold' : 'gray', cursor: 'pointer'}} onClick={onPress} className="mr-1"/>


class UserProfile extends Component {
    state = {isLoading: true, user: {}, hasError: false};

    componentDidMount() {
        const {uuid} = this.props.match.params;
        AppService.getUserById(uuid).then(({data: {data}}) => {
            this.setState({user: data})
        }).catch(catchError).finally(() => this.setState({isLoading: false}));
    }


    renderView() {
        const {user, isLoading, hasError} = this.state;
        if (isLoading) {
            return <Spinner/>
        }

        if (hasError) {
            return <Spinner/>
        }
        return (
            <Col sm="11" className="mx-auto">
                <div className=" border-0 " style={{borderRadius: 15}}>
                    <div className="bg-gray spaced px-3" style={{height: 150, alignItems: 'flex-end'}}>
                        <img src={user && user.avatar_url}
                             alt={'profile'}
                             style={{
                                 width: 140, height: 140, borderWidth: 8, borderStyle: 'solid',
                                 borderColor: '#fff', borderRadius: 120,
                                 marginBottom: -50, marginLeft: 20
                             }}
                        />
                    </div>
                    <div className="row no-gutters">
                        <div className="col-xl-3 col-xxl-3">
                            <div className="border-right border-md-n h-100">
                                <div className=" pt-4">
                                    <div className="mt-3">
                                        <div className="p-3">
                                            <h6 className="p-0 m-0">{user.last_name} {user.first_name}</h6>
                                            <p className="p-0 m-0 fs-14">{user.location || ''}</p>
                                            <p className="p-1 m-0 fs-14">Member since {user.created_at},</p>
                                            <p className="p-1 m-0 fs-14">Reviews {user.stars || 0} <AiFillStar/></p>
                                            <p className="p-1 m-0 fs-14">{user.completion_rate || '0%'} Completion
                                                rate</p>
                                            <p className="p-1 m-0 fs-14">
                                                <AiOutlineMail/> {isNull(user.email) ? 'Unverified' : 'Verified'}</p>
                                            <p className="p-1 m-0 fs-14">
                                                <AiOutlinePhone/> {isNull(user.phone) ? 'Unverified' : 'Verified'} </p>
                                        </div>
                                        <br/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-xxl-9">
                            <div className="px-3 py-2">
                                <h4 className="p-0 m-0">About</h4>
                                <p style={{minHeight: 120}}>{user.tagline}<br/>{user.description}</p>
                            </div>
                            <hr className="m-0 p-0"/>
                            <div className="px-3 py-2">
                                <h4 className="p-0 m-0">Skills</h4>
                                {isNull(user.tagline) && isNull(user.description) ?
                                    <p style={{minHeight: 120}} className="p-0 m-0 fs-14">This user has not added any
                                        skills yet.</p>
                                    : <p style={{minHeight: 120}}>{user.tagline}<br/>{user.description}</p>}
                            </div>
                            <hr className="m-0 p-0"/>
                            <div className="px-3 py-2">
                                <h4 className="">Reviews</h4>
                                {(user.hasOwnProperty('reviews') && user.reviews.length < 1) ?
                                    <p style={{minHeight: 120}} className="p-0 m-0 fs-14">This user has no reviews as a
                                        Tasker yet</p> :
                                    <div className="col-sm-10">
                                        {user.reviews.map(({stars: star, ...review}, key) => {
                                            return <div key={key} className="card py-2 px-4 mb-2">
                                                <p className="fs-12">{review.review}</p>
                                                <div className="spaced">
                                                    <div>
                                                        <StarRate active={star > 0}/>
                                                        <StarRate active={star > 1}/>
                                                        <StarRate active={star > 2}/>
                                                        <StarRate active={star > 3}/>
                                                        <StarRate active={star > 4}/>
                                                    </div>
                                                    <p className="fs-10 text-right font-italic">{review.created_at}</p>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                }
                            </div>
                            <hr className="m-0 p-0"/>

                            <div className="px-3 py-2">
                                <h4>Work History</h4>
                                {isNull(user.work_history) ?
                                    <p style={{minHeight: 120}} className="p-0 m-0 fs-14">This user has no work history
                                        as a Tasker yet</p> :
                                    <div className="col-sm-10">
                                        {user.work_history.map((review, key) => {
                                            return <div className="card py-2 px-4 mb-2" key={key}>
                                                <h6 className="fs-16">{review.title}</h6>
                                                <p className="fs-12 pb-0 mb-0">{review.description}</p>
                                                <div className="spaced">
                                                    <p className="fs-10 pb-0 mb-0 font-italic">{review.status}</p>
                                                    <p className="fs-10 pb-0 mb-0 text-right font-italic">{review.created_at}</p>
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>


                </div>
            </Col>
        );
    }

    render() {
        return (
            <Layout noFooter>
                <Row className="justify-content-center px-5 mt-3 mb-5">
                    {this.renderView()}
                </Row>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
}
export default connect(mapStateToProps, {login})(UserProfile);
