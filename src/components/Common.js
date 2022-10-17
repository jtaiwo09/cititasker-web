import React, {useState} from 'react'
import {NavLink} from "react-router-dom";
import {catchError, Naira} from "../utils";
import {BsCalendar} from "react-icons/bs";
import {isNull} from "../utils/helper";
import Swal from "sweetalert2";
import {AuthService} from "../services";
import {Col, Input, Spinner} from "reactstrap";


export const TaskCard = ({data}) => {
    // new-task-list-item--issue
    let status = 'new-task-list-item--draft';
    // new-task-list-item--draft
    // new-task-list-item--offered
    // new-task-list-item--ineligible
    if (data.status === 'CANCELLED') {
        status = 'new-task-list-item--issue'
    }
    if (data.status === 'ASSIGNED') {
        status = 'new-task-list-item--offered'
    }
    if (data.status === 'COMPLETED') {
        status = 'new-task-list-item--ineligible'
    }
    if (data.status === 'OPEN') {
        status = 'new-task-list-item--open'
    }

    return (
        <NavLink
            to={'/task/' + data.slug}
            className={`new-task-list-item ${status} 
             ${(window.location.pathname === '/task/' + data.slug) && 'new-task-list-item--active'}`}>
            <div className="new-task-list-item__header ">
                <span className="new-task-list-item__title">{data.title}</span>
                <div className="new-task-list-item__price">
                    <span>{Naira + data.price}</span>
                </div>
            </div>
            <div className="new-task-list-item__body">
                <div className="avatar-img new-task-list-item__avatar">
                    <img
                        src={data.user.avatar_url}
                        alt="data.user.last_name"
                        style={{borderRadius: 32}}
                        width="32" height="32"/>
                </div>
                <div className="new-task-list-item__online at-icon-online">
                    <span className="new-task-list-item__detail">{data.type}</span>
                </div>
                <div className="new-task-list-item__date ">
                    <span className="new-task-list-item__detail"><BsCalendar/> {data.due_date}</span>
                </div>
            </div>
            <div className="new-task-list-item__footer">
                <span className="new-task-list-item__status">{data.status || 'DRAFT'}</span>
            </div>
        </NavLink>
    )
};


export const TaskImage = () => {
    return (
        <div>

        </div>
    );
};

export function UpdatePhoneNumber({user, updateUser, onDone}) {
    const [phone, setPhone] = useState(user ? user.phone : '')
    const [otp, setOtp] = useState('')
    const [showOtp, setShowOtp] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const updatePhone = () => {
        if (isNull(phone)) {
            return Swal.fire('Error', 'Phone number is required', 'error')
        }

        setLoading(true)
        if (showOtp) {
            AuthService.updatePhone({phone, otp})
                .then(({data}) => {
                    Swal.fire('Success', 'Updated successfully', 'success')
                    updateUser(data.data || {})
                    onDone && onDone()
                    setLoading(false)
                    setShowOtp(false)
                })
                .catch((error) => {
                    setLoading(false)
                    catchError(error)
                })
        } else {
            AuthService.requestPhoneUpdate({phone})
                .then(({data}) => {
                    Swal.fire('Success', 'Enter OTP sent to your phone & mail', 'success')
                    setLoading(false)
                    setShowOtp(true)
                })
                .catch((error) => {
                    setLoading(false)
                    catchError(error)
                })
        }

    }
    return (
        <div className="w-100">
            <div className="row">
                <Col sm={8}>
                    <Input
                        onChange={e => setPhone(e.target.value)}
                        type="tel" value={phone} className="form-control"
                        placeholder="08123846789"
                    />
                </Col>
                <Col sm={4}>
                    {showOtp &&
                    <Input
                        onChange={e => setOtp(e.target.value)}
                        type="number" value={otp} className="form-control"
                        placeholder="******"
                    />}
                </Col>
            </div>

            <button disabled={isLoading} type="button" onClick={updatePhone}
                    className="btn btn-md fs-12 mt-2 ff-700 fw-700  btn-round btn-success">
                {isLoading ? <Spinner/> : 'Save Phone'}
            </button>
        </div>
    );
}
