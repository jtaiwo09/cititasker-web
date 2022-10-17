import React, {Component} from "react";
import Layout from "../components/Layout";
import {connect} from 'react-redux'
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
    Spinner
} from "reactstrap";
import {NavLink} from "react-router-dom";
import {Formik} from "formik";
import {resetPassword, verifyToken} from '../store/modules/auth'


class ChangePassword extends Component {
    state = {
        isLoading: false,
        emailError: '', passwordError: ''
    };


    componentDidMount() {
        window.scroll(0, 0);
        // const {match} = this.props
        // this.props.verifyToken(match.params.token)

    }

    performLogin = (values, {setSubmitting}) => {
        this.props.resetPassword(values, setSubmitting, this.props.history.replace)
    };

    render() {
        const {match} = this.props
        return (
            <Layout>
                <Row className="justify-content-center px-5 my-5">
                    <Col lg="5">
                        <Card className=" shadow border-0">
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <h3>Set New Password</h3>
                                </div>
                                <Formik
                                    initialValues={{
                                        token: match.params.token || '',
                                        password: '',
                                        password_confirmation: ''
                                    }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.token) {
                                            errors.token = 'Token is required';
                                        }
                                        if (!values.password) {
                                            errors.password = 'Password field cannot be empty'
                                        }
                                        if (!values.password_confirmation) {
                                            errors.password_confirmation = 'Password field cannot be empty'
                                        }
                                        if (values.password_confirmation !== values.password) {
                                            errors.password_confirmation = 'Confirm your password Passwords'
                                        }
                                        return errors;
                                    }}
                                    onSubmit={this.performLogin}
                                >
                                    {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,}) =>
                                        (<Form innerRef={ref => this.loginForm = ref} role="form"
                                               onSubmit={handleSubmit}>
                                                <FormGroup
                                                    className={`mb-3 ${errors.email && touched.email && 'has-danger focused'}`}>
                                                    <InputGroup
                                                        className="input-group-alternative input-group input-group-alternative"
                                                        focused>
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-lock-circle-open"/>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input placeholder="Token" type="text"
                                                               name="token" invalid disabled={match.params.token}
                                                               onChange={handleChange}
                                                               onBlur={handleBlur}
                                                               value={values.token}/>
                                                    </InputGroup>
                                                    {errors.token && touched.token &&
                                                    <span className="invalid-feedback " style={{display: 'block'}}
                                                          role="alert"><strong>{errors.token}</strong></span>
                                                    }
                                                </FormGroup>


                                                <FormGroup
                                                    className={`mb-1  ${errors.password && touched.password && 'has-danger focused'}`}>
                                                    <InputGroup className="input-group-alternative">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-lock-circle-open"/>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input placeholder="Password"
                                                               type="password" name="password" onChange={handleChange}
                                                               onBlur={handleBlur} value={values.password}
                                                               autoComplete="off"/>
                                                    </InputGroup>
                                                    {errors.password && touched.password &&
                                                    <span className="invalid-feedback " style={{display: 'block'}}
                                                          role="alert"><strong>{errors.password}</strong></span>
                                                    }
                                                </FormGroup>
                                                <FormGroup
                                                    className={`mb-1  ${errors.password_confirmation && touched.password_confirmation && 'has-danger focused'}`}>
                                                    <InputGroup className="input-group-alternative">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-lock-circle-open"/>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input placeholder="Confirm Password"
                                                               type="password" name="password_confirmation"
                                                               onChange={handleChange}
                                                               onBlur={handleBlur} value={values.password_confirmation}
                                                               autoComplete="off"/>
                                                    </InputGroup>
                                                    {errors.password_confirmation && touched.password_confirmation &&
                                                    <span className="invalid-feedback " style={{display: 'block'}}
                                                          role="alert"><strong>{errors.password_confirmation}</strong></span>
                                                    }
                                                </FormGroup>
                                                <div className="text-center">
                                                    <Button className="mt-4 btn-round" style={{width: '60%'}}
                                                            disabled={isSubmitting}
                                                            type="submit"
                                                            color="primary">
                                                        {!isSubmitting ? 'Reset Password' :
                                                            <Spinner color="white"/>
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
                                <NavLink to={'/login'}>
                                    <span>Login</span>
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
export default connect(mapStateToProps, {resetPassword, verifyToken})(ChangePassword);
