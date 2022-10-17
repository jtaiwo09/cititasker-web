import React, { Component } from "react";
import Layout from "../components/Layout";
import { connect } from 'react-redux'
import {
    Button,
    Card,
    CardBody,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row,
    Spinner,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import { Formik } from "formik";
import Auth from '../utils/AuthenticationHandler'
import { login } from '../store/modules/auth'


class VerifyToken extends Component {
    state = {
        isLoading: false,
        emailError: '', passwordError: ''
    };

    componentDidMount() {
        window.scroll(0, 0);
    }

    performLogin = (values, { setSubmitting }) => {
        Auth.login(values, setSubmitting, this.props.history.replace)
    };

    render() {
        return (
            <Layout>
                <Row className="justify-content-center px-5 my-5">
                    <Col lg="5">
                        <Card className=" shadow border-0">
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <h3>Login with your Details</h3>
                                </div>
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.email) {
                                            errors.email = 'Email is required';
                                        } else if (
                                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                        ) {
                                            errors.email = 'Invalid email address';
                                        }
                                        if (!values.password) {
                                            errors.password = 'Password field cannot be empty'
                                        }
                                        return errors;
                                    }}
                                    onSubmit={this.performLogin}
                                >
                                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) =>
                                        (<Form innerRef={ref => this.loginForm = ref} role="form"
                                            onSubmit={handleSubmit}>
                                            <FormGroup
                                                className={`mb-3 ${errors.email && touched.email && 'has-danger focused'}`}>
                                                <InputGroup
                                                    className="input-group-alternative input-group input-group-alternative"
                                                    focused>
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="ni ni-email-83" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input placeholder="Email" type="email"
                                                        name="email" invalid
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.email} />
                                                </InputGroup>
                                                {errors.email && touched.email &&
                                                    <span className="invalid-feedback " style={{ display: 'block' }}
                                                        role="alert"><strong>{errors.email}</strong></span>
                                                }
                                            </FormGroup>


                                                <FormGroup
                                                    className={`mb-1  ${errors.password && touched.password && 'has-danger focused'}`}>
                                                    <InputGroup className="input-group-alternative">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-lock-circle-open" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input placeholder="Password"
                                                            type="password" name="password" onChange={handleChange}
                                                            onBlur={handleBlur} value={values.password}
                                                            autoComplete="off" />
                                                    </InputGroup>
                                                    {errors.password && touched.password &&
                                                        <span className="invalid-feedback " style={{ display: 'block' }}
                                                            role="alert"><strong>{errors.password}</strong></span>
                                                    }
                                                </FormGroup>
                                            <div
                                                className="custom-control custom-control-alternative custom-checkbox">
                                                <input className="custom-control-input" id=" customCheckLogin"
                                                    type="checkbox" />
                                                <label className="custom-control-label" htmlFor=" customCheckLogin">
                                                    <span>Remember me</span>
                                                </label>
                                            </div>
                                            <div className="text-center">
                                                <Button className="mt-4 btn-round" style={{ width: '60%' }}
                                                    disabled={isSubmitting}
                                                    type="submit"
                                                    color="primary">
                                                    {!isSubmitting ? 'Sign in' :
                                                        <Spinner color="white" />
                                                    }
                                                </Button>
                                            </div>
                                        </Form>
                                        )}
                                </Formik>
                            </CardBody>
                        </Card>
                        <Row className="mt-3">
                            <Col xs="6">
                                <NavLink to={'/forgot'}>
                                    <span>Forgot password?</span>
                                </NavLink>
                            </Col>
                            <Col className="text-right" xs="6">
                                <NavLink to={'/register'}>
                                    <span>Create new account</span>
                                </NavLink>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {};
}
export default connect(mapStateToProps, { login })(VerifyToken);
