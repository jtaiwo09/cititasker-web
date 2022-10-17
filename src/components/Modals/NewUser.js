import {Formik} from "formik";
import React, {Component} from 'react';
import {GrClose} from "react-icons/gr";
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, Row} from 'reactstrap';
import {connect} from "react-redux";
import {setUser, updateProfile} from "../../store/modules/auth";


class NewUser extends Component {
    state = {step: 0, inPerson: true};

    processForm = () => {
        const {step} = this.state;
        if (step === 3) {
            this.props.togglePostATask()
        }
        this.setState({step: step + 1})


    };
    previousForm = () => {
        const {step} = this.state;
        this.setState({step: (step - 1)})
    };
    onSubmit = () => {

    }


    render() {
        const {togglePostATask, className} = this.props;
        const { isSubmitting} = this.state;
        return (
            <div>
                <Modal isOpen={false}
                       toggle={togglePostATask} className={className}
                       backdrop={'static'}
                       keyboard>
                    <div className="d-flex justify-content-between align-items-center w-100 px-4 py-4">
                        <h3 className="mx-auto mb-0">Welcome to Cititasker?</h3>
                        <GrClose onClick={togglePostATask}/>
                    </div>
                    <ModalBody className="py-2">
                        <Formik
                            initialValues={{first_name: '', last_name: '', todo: [], location: ''}}
                            validate={values => {
                                const errors = {};
                                if (!values.first_name) {
                                    errors.first_name = 'First Name is required';
                                }
                                if (!values.last_name) {
                                    errors.last_name = ':Last Name is required';
                                }
                                if (!values.location) {
                                    errors.location = 'Location is required';
                                }

                                return errors;
                            }}
                            onSubmit={this.onSubmit}
                        >
                            {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,}) =>
                                (<Form innerRef={ref => this.loginForm = ref} role="form" onSubmit={handleSubmit}>

                                        <FormGroup
                                            className={`mb-3 ${errors.first_name && touched.first_name && 'has-danger focused'}`}>
                                            <Label className="mb-0">First Name</Label>
                                            <Input
                                                className="mt-2 input-group-alternative input-group"
                                                placeholder="First Name" type="text"
                                                name="first_name" invalid={errors.first_name && touched.first_name}
                                                onChange={handleChange} onBlur={handleBlur}
                                                value={values.first_name}
                                            />
                                            {errors.first_name && touched.first_name &&
                                            <span className="invalid-feedback " style={{display: 'block'}}
                                                  role="alert"><strong>{errors.first_name}</strong></span>
                                            }
                                        </FormGroup>

                                        <FormGroup
                                            className={`mb-3 ${errors.last_name && touched.last_name && 'has-danger focused'}`}>
                                            <Label className="mb-0">First Name</Label>
                                            <Input
                                                className="mt-2 input-group-alternative input-group"
                                                placeholder="First Name" type="text"
                                                name="last_name" invalid={errors.last_name && touched.last_name}
                                                onChange={handleChange} onBlur={handleBlur}
                                                value={values.last_name}
                                            />
                                            {errors.last_name && touched.last_name &&
                                            <span className="invalid-feedback " style={{display: 'block'}}
                                                  role="alert"><strong>{errors.last_name}</strong></span>
                                            }
                                        </FormGroup>

                                        <FormGroup
                                            className={`mb-3 ${errors.location && touched.location && 'has-danger focused'}`}>
                                            <Label className="mb-0">Your Location</Label>
                                            <Input
                                                className="mt-2 input-group-alternative input-group"
                                                placeholder="Your Nearest Area" type="text"
                                                name="location" invalid={errors.location && touched.location}
                                                onChange={handleChange} onBlur={handleBlur}
                                                value={values.location}
                                            />
                                            {errors.location && touched.location &&
                                            <span className="invalid-feedback " style={{display: 'block'}}
                                                  role="alert"><strong>{errors.location}</strong></span>
                                            }
                                        </FormGroup>

                                        <div class="mt-3"><Label>What will you like to do</Label></div>
                                        <Row className="px-3">
                                            {/* <Col> */}
                                            <div
                                                className="custom-control custom-control-alternative  custom-checkbox">
                                                <input className="custom-control-input" id="getthings" type="checkbox"/>
                                                <label className="custom-control-label" htmlFor="getthings">
                                                    <span>Get things done</span>
                                                </label>
                                            </div>
                                            {/* </Col>
                                        <Col> */}
                                            <div
                                                className="custom-control ml-4 custom-control-alternative custom-checkbox">
                                                <input className="custom-control-input" id="earn" type="checkbox"/>
                                                <label className="custom-control-label" htmlFor="earn">
                                                    <span>Earn Money</span>
                                                </label>
                                            </div>
                                            {/* </Col> */}
                                        </Row>


                                    </Form>
                                )}
                        </Formik>
                    </ModalBody>
                    <ModalFooter className="mt-4">
                        <Button className="btn-round mx-auto" style={{width: '60%'}}
                                disabled={isSubmitting}
                                type="submit"
                                color="primary">
                            'Update '
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}


const mapStateToProps = ({Auth, User: user, Application}) => {
    return {...Auth, user}
}

export default connect(mapStateToProps, {updateProfile, setUser})(NewUser);

