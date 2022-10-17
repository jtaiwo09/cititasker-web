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
import {forgetPassword} from '../store/modules/auth'


class ForgetPassword extends Component {
    state = {
        isLoading: false,
        emailError: '', passwordError: ''
    };

    componentDidMount() {
        window.scroll(0, 0);
    }

    performLogin = (values, {setSubmitting}) => {
        this.props.forgetPassword(values, setSubmitting, this.props.history.replace)
    };

    render() {
        return (
            <Layout>
                <Row className="justify-content-center px-5 my-5">
                    <Col lg="5">
                        <Card className=" shadow border-0">
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <h3>Reset Password</h3>
                                </div>
                                <Formik
                                    initialValues={{email: '',}}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.email) {
                                            errors.email = 'Email is required';
                                        } else if (
                                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                        ) {
                                            errors.email = 'Invalid email address';
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
                                                                <i className="ni ni-email-83"/>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input placeholder="Email" type="email"
                                                               name="email" invalid
                                                               onChange={handleChange}
                                                               onBlur={handleBlur}
                                                               value={values.email}/>
                                                    </InputGroup>
                                                    {errors.email && touched.email &&
                                                    <span className="invalid-feedback " style={{display: 'block'}}
                                                          role="alert"><strong>{errors.email}</strong></span>
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
                                <NavLink to={'/forgot'}>
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
export default connect(mapStateToProps, {forgetPassword})(ForgetPassword);
