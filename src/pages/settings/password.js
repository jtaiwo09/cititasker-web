import React, {Component} from "react";
import UserLayout from "../../layouts/UserLayout";
import {FormGroup, Input} from "reactstrap";
import {Formik} from "formik";
import {connect} from "react-redux";
import {updateProfilePassword} from "../../store/modules/auth";


class PasswordScreen extends Component<{}> {


    render() {
        return (
            <UserLayout>
                <div className=" user-profile ff-700 ">
                    <div
                        className="px-4 d-sm-flex border-bottom d-block justify-content-sm-between align-items-sm-center">
                        <h5>Password</h5>
                    </div>

                    <Formik
                        initialValues={{current: '', password: '', confirm: ''}}
                        validate={values => {
                            const errors = {};
                            if (values.password === values.current) {
                                errors.password = 'Your new password should be different from your current password'
                            }
                            if (values.password !== values.confirm) {
                                errors.confirm = 'Confirm the new password '
                            }
                            if (values.password.length < 6) {
                                errors.password = 'Password field cannot be less than 6 characters'
                            }

                            if (!values.password) {
                                errors.password = 'Password field cannot be empty'
                            }
                            if (!values.current) {
                                errors.current = 'Current Password field cannot be empty'
                            }
                            if (!values.confirm) {
                                errors.confirm = 'Confirm New Password field cannot be empty'
                            }

                            return errors;
                        }}
                        onSubmit={this.props.updateProfilePassword}
                    >
                        {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,}) =>
                            (
                                <form id="passwordForm"  onSubmit={handleSubmit}>
                                    <div className="p-4 w-100">
                                        <div className="row mt-3">
                                            <div className="col-sm-6 ">

                                                <FormGroup
                                                    className={`mb-4 ${errors.current && touched.current && 'has-danger focused'}`}>
                                                    <label htmlFor="old-password">Current Password</label>
                                                    <Input placeholder="Password" id="old-password"
                                                           type="password" name="current" onChange={handleChange}
                                                           onBlur={handleBlur} value={values.current}
                                                           autoComplete="off"/>
                                                    {errors.current && touched.current &&
                                                    <span className="invalid-feedback " style={{display: 'block'}}
                                                          role="alert"><strong>{errors.current}</strong></span>
                                                    }
                                                </FormGroup>

                                                <FormGroup
                                                    className={`mb-4 ${errors.password && touched.password && 'has-danger focused'}`}>
                                                    <label htmlFor="new-password">New Password</label>
                                                    <Input placeholder="Password" id="new-password"
                                                           type="password" name="password" onChange={handleChange}
                                                           onBlur={handleBlur} value={values.password}
                                                           autoComplete="off"/>
                                                    {errors.password && touched.password &&
                                                    <span className="invalid-feedback " style={{display: 'block'}}
                                                          role="alert"><strong>{errors.password}</strong></span>
                                                    }
                                                </FormGroup>

                                                <FormGroup
                                                    className={`mb-4 ${errors.confirm && touched.confirm && 'has-danger focused'}`}>
                                                    <label htmlFor="confirm-password">Confirm New Password</label>
                                                    <Input placeholder="Password" id="confirm-password"
                                                           type="password" name="confirm"
                                                           onChange={handleChange}
                                                           onBlur={handleBlur} value={values.confirm}
                                                           autoComplete="off"/>
                                                    {errors.confirm && touched.confirm &&
                                                    <span className="invalid-feedback " style={{display: 'block'}}
                                                          role="alert"><strong>{errors.confirm}</strong></span>
                                                    }
                                                </FormGroup>


                                                <div>
                                                    <button type="submit"
                                                            className="btn-success mt-3 fs-12 fw-700 ff-700  btn btn-round">
                                                        Update Password
                                                    </button>
                                                </div>
                                                <div className="clearfix"/>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                    </Formik>

                </div>
            </UserLayout>
        );
    }
}

export default connect(null, {updateProfilePassword})(PasswordScreen);
