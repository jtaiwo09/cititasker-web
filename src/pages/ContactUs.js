import React, {Component} from "react";
import Layout from "../components/Layout";
import {
    Button,
    Card,
    CardBody,
    Form,
    FormGroup,
    Input,
    InputGroup,

    Spinner
} from "reactstrap";
import {Formik} from "formik";
import * as Yup from "yup";
import {AuthService} from "../services";
import Swal from "sweetalert2";


class Dashboard extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <Layout>
                <div style={{minHeight: '90vh'}}>

                    <div className="justified flex-column py-5">
                        <h1 className="animate text-center animate__ease--custom-1 animate__delay--300 animate--glide-up">Contact
                            Support</h1>
                        <p className="text-center u-animate u-animate__ease--custom-1 u-animate__delay--400 u-animate__duration--600 u-animate--glide-up">
                            We're available around the clock. <br/>Let us know how we can help!
                        </p>
                    </div>

                    <div className="container pb-5">
                        <div className="row my-5 py-5">
                            <div className="col-md-6  mx-auto">
                                <Card>
                                    <CardBody>
                                        <Formik
                                            initialValues={{
                                                phone: '', email: '', name: '', subject: '', category: '',
                                                message: '',
                                            }}
                                            validationSchema={Yup.object().shape({
                                                name: Yup.string().required('Name cannot be empty'),
                                                email: Yup.string().email().required('Email is required'),
                                                phone: Yup.string().required('Phone is required'),
                                                category: Yup.string().required('Category is required'),
                                                message: Yup.string().nullable(),
                                                subject: Yup.string().nullable(),
                                            })}
                                            onSubmit={(values, {setSubmitting, resetForm}) => {
                                                AuthService.contact(values)
                                                    .then(({data}) => {
                                                        Swal.fire('Success', 'Message sent successfully', 'success')
                                                    resetForm({
                                                        phone: '', email: '', name: '', subject: '', category: '',
                                                        message: '',
                                                    })
                                                    }).catch((error) => {
                                                    Swal.fire('Error', 'Something went wrong', 'error')
                                                }).finally(() => {
                                                    setSubmitting(false)
                                                })
                                            }}
                                        >
                                            {({
                                                  values,
                                                  errors,
                                                  touched,
                                                  handleChange,
                                                  handleBlur,
                                                  handleSubmit,
                                                  isSubmitting,
                                              }) =>
                                                (<Form innerRef={ref => this.loginForm = ref} role="form"
                                                       onSubmit={handleSubmit}>
                                                        <FormGroup
                                                            className={`mb-3 ${errors.name && touched.name && 'has-danger focused'}`}>
                                                            <label>Full Name</label>
                                                            <InputGroup
                                                                className="input-group-alternative input-group input-group-alternative"
                                                                focused>
                                                                <Input placeholder="Name" type="text"
                                                                       name="name" invalid
                                                                       onChange={handleChange}
                                                                       onBlur={handleBlur}
                                                                       value={values.name}/>
                                                            </InputGroup>
                                                            {errors.name && touched.name &&
                                                            <span className="invalid-feedback "
                                                                  style={{display: 'block'}}
                                                                  role="alert"><strong>{errors.name}</strong></span>
                                                            }
                                                        </FormGroup>
                                                        <FormGroup
                                                            className={`mb-3 ${errors.phone && touched.phone && 'has-danger focused'}`}>
                                                            <label>What's your phone number </label>
                                                            <InputGroup
                                                                className="input-group-alternative input-group input-group-alternative"
                                                                focused>

                                                                <Input placeholder="Phone" type="text"
                                                                       name="phone" invalid
                                                                       onChange={handleChange}
                                                                       onBlur={handleBlur}
                                                                       value={values.phone}/>
                                                            </InputGroup>
                                                            {errors.phone && touched.phone &&
                                                            <span className="invalid-feedback "
                                                                  style={{display: 'block'}}
                                                                  role="alert"><strong>{errors.phone}</strong></span>
                                                            }
                                                        </FormGroup>
                                                        <FormGroup
                                                            className={`mb-3 ${errors.email && touched.email && 'has-danger focused'}`}>
                                                            <label>Your email</label>
                                                            <InputGroup
                                                                className="input-group-alternative input-group input-group-alternative"
                                                                focused>

                                                                <Input placeholder="Email" type="email"
                                                                       name="email" invalid
                                                                       onChange={handleChange}
                                                                       onBlur={handleBlur}
                                                                       value={values.email}/>
                                                            </InputGroup>
                                                            {errors.email && touched.email &&
                                                            <span className="invalid-feedback "
                                                                  style={{display: 'block'}}
                                                                  role="alert"><strong>{errors.email}</strong></span>
                                                            }
                                                        </FormGroup>

                                                        <FormGroup
                                                            className={`mb-3 ${errors.category && touched.category && 'has-danger focused'}`}>
                                                            <label>Category</label>
                                                            <InputGroup
                                                                className="input-group-alternative input-group input-group-alternative"
                                                                focused>
                                                                <Input name="category" invalid type='select'
                                                                       onChange={handleChange}
                                                                       onBlur={handleBlur}>
                                                                    <option label value={''}>Select Option</option>
                                                                    <option>Others</option>
                                                                </Input>
                                                            </InputGroup>
                                                            {errors.category && touched.category &&
                                                            <span className="invalid-feedback "
                                                                  style={{display: 'block'}}
                                                                  role="alert"><strong>{errors.category}</strong></span>
                                                            }
                                                        </FormGroup>
                                                        {values.category && <>
                                                            <FormGroup
                                                                className={`mb-3 ${errors.subject && touched.subject && 'has-danger focused'}`}>
                                                                <label>Subject</label>
                                                                <InputGroup
                                                                    className="input-group-alternative input-group input-group-alternative"
                                                                    focused>
                                                                    <Input placeholder="Subject"
                                                                           name="subject" invalid
                                                                           onChange={handleChange}
                                                                           onBlur={handleBlur}
                                                                           value={values.subject}/>
                                                                </InputGroup>
                                                                {errors.subject && touched.subject &&
                                                                <span className="invalid-feedback "
                                                                      style={{display: 'block'}}
                                                                      role="alert"><strong>{errors.subject}</strong></span>
                                                                }
                                                            </FormGroup>
                                                            <FormGroup
                                                                className={`mb-3 ${errors.message && touched.message && 'has-danger focused'}`}>
                                                                <label>Message</label>
                                                                <InputGroup
                                                                    className="input-group-alternative input-group input-group-alternative"
                                                                    focused>
                                                                    <Input placeholder="Message"
                                                                           style={{minHeight: 150}}
                                                                           name="message" invalid type='textarea'
                                                                           onChange={handleChange}
                                                                           onBlur={handleBlur}/>
                                                                </InputGroup>
                                                                {errors.message && touched.message &&
                                                                <span className="invalid-feedback "
                                                                      style={{display: 'block'}}
                                                                      role="alert"><strong>{errors.message}</strong></span>
                                                                }
                                                            </FormGroup>
                                                        </>}

                                                        <div className="text-center">
                                                            <Button className="mt-4 btn-round" style={{width: '60%'}}
                                                                    disabled={isSubmitting}
                                                                    type="submit"
                                                                    color="primary">
                                                                {!isSubmitting ? 'Submit' :
                                                                    <Spinner color="white"/>
                                                                }
                                                            </Button>
                                                        </div>
                                                    </Form>
                                                )}
                                        </Formik>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="col-md-5 mx-auto  flexed central">
                                <div className="">

                                    <div className="">
                                        <h3>Need a quick answer?</h3>
                                        <p>The Cititasker Help Desk has:</p>
                                    </div>
                                    <div className="u-list u-list--blue ">
                                        <li>Detailed guides and instructions</li>
                                        <li>How-to videos</li>
                                        <li>Answers to common questions</li>
                                    </div>

                                    <div className="mt-3">
                                        <a href="tel:/+2349002" target="_blank"  rel="noopener noreferrer"
                                           className="c-button c-button--primary c-button--link">
                                            Call Us
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Dashboard;
