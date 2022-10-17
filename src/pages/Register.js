import {Formik} from "formik";
import React, {Component} from "react";
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import {toast} from 'react-toastify';
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
import Layout from "../components/Layout";
import {fetchUser, register, setUser} from '../store/modules/auth';
import Auth from '../utils/AuthenticationHandler';
import {catchError} from "../utils";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxOption, ComboboxPopover} from "@reach/combobox";


function SearchLocation({panTo, setMarker, location, setLocation}) {
    const {value, suggestions: {status, data}, setValue, clearSuggestions,} = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => 9.082, lng: () => 8.6753,},
            radius: 200 * 1000,
        }
    });

    return (
        <Combobox className="flex-grow-1"
                  onSelect={async (address) => {
                      setValue(address, false);
                      clearSuggestions();
                      try {
                          const results = await getGeocode({address});
                          const {lat, lng} = await getLatLng(results[0]);
                          panTo({lat, lng});
                          setMarker({lat, lng});
                          setLocation({
                              ...location,
                              address,
                              lat,
                              lng,
                              formatted_address: results[0].formatted_address
                          });
                      } catch (error) {
                          console.log(error);
                      }
                  }}
        >
            <div className="my-0 w-100 pb-0">
                <ComboboxInput
                    className="form-control   fw-500 fs-16"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    // disabled={!ready}
                    placeholder="Enter the closest landmark"
                />
                {status && (
                    <ComboboxPopover className="dropdown-menu empty d-block">
                        {status === "OK" &&
                        data.map(({id, description}) => (
                            <ComboboxOption
                                className="dropdown-item fs-16 "
                                key={id}
                                value={description}
                            />
                        ))}
                    </ComboboxPopover>
                )}
            </div>
        </Combobox>
    );
}


class Register extends Component {
    state = {
        isLoading: false, location: {}, get_things_done: false, earn_money: false,
        emailError: '', passwordError: ''
    };

    componentDidMount() {
        window.scroll(0, 0)
    }

    performLogin = (values, {setSubmitting}) => {
        const {location, get_things_done, earn_money,} = this.state;
        values['location_object'] =  JSON.stringify(location)
        if (location && location.hasOwnProperty('address'))
            values['location'] = location.address;
        values['get_things_done'] = get_things_done
        values['earn_money'] = earn_money

        this.props.register(values).then((response) => {
            const {data: {token, user}} = response.data;
            setSubmitting(false);
            Auth.login(token);
            this.props.setUser(user);
            toast.success('Your account has been created successfully')
            toast.info('Please verify your account', {autoClose: 10000});
            toast.info('Please update your account', {autoClose: 10000});
            this.props.fetchUser();
            this.props.history.replace('/account/not-verify');
        }).catch(error => {
            setSubmitting(false);
            catchError(error);
        });
    };


    render() {
        const {location, earn_money, get_things_done} = this.state;
        const panTo = ({lat, lng}) => {
            if (this.mapRef) {
                this.mapRef.current.panTo({lat, lng});
                this.mapRef.current.setZoom(14);
            }
        };
        return (
            <Layout>
                <Row className="justify-content-center px-3 my-5">
                    <Col lg="6">
                        <Card className=" shadow border-0">
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="text-center text-muted mb-4">
                                    <h3>New User</h3>
                                </div>
                                <Formik
                                    initialValues={{email: '', password: ''}}
                                    // enableReinitialize
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
                                        if (!values.last_name) {
                                            errors.last_name = 'Last name field cannot be empty'
                                        }
                                        if (!values.first_name) {
                                            errors.first_name = 'First name field cannot be empty'
                                        }
                                        // if (!values.phone) {
                                        //     errors.phone = 'Phone field cannot be empty'
                                        // }
                                        return errors;
                                    }}
                                    onSubmit={this.performLogin}
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
                                                <Row>
                                                    <Col sm="6">
                                                        <FormGroup
                                                            className={`mb-3 ${errors.last_name && touched.last_name && 'has-danger focused'}`}>
                                                            <label>Last Name</label>

                                                            <InputGroup
                                                                className="input-group-alternative input-group input-group-alternative"
                                                                focused>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="ni ni-user"/>
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input placeholder="Last Name" type="text"
                                                                       name="last_name" invalid
                                                                       onChange={handleChange}
                                                                       onBlur={handleBlur}
                                                                       value={values.last_name}/>
                                                            </InputGroup>
                                                            {errors.last_name && touched.last_name &&
                                                            <span className="invalid-feedback "
                                                                  style={{display: 'block'}}
                                                                  role="alert"><strong>{errors.last_name}</strong></span>
                                                            }
                                                        </FormGroup>
                                                    </Col>
                                                    <Col sm="6">
                                                        <FormGroup
                                                            className={`mb-3 ${errors.first_name && touched.first_name && 'has-danger focused'}`}>
                                                            <label>First Name</label>

                                                            <InputGroup
                                                                className="input-group-alternative input-group input-group-alternative"
                                                                focused>
                                                                <InputGroupAddon addonType="prepend">
                                                                    <InputGroupText>
                                                                        <i className="ni ni-hat-3"/>
                                                                    </InputGroupText>
                                                                </InputGroupAddon>
                                                                <Input placeholder="First Name" type="text"
                                                                       name="first_name" invalid
                                                                       onChange={handleChange}
                                                                       onBlur={handleBlur}
                                                                       value={values.first_name}/>
                                                            </InputGroup>
                                                            {errors.first_name && touched.first_name &&
                                                            <span className="invalid-feedback "
                                                                  style={{display: 'block'}}
                                                                  role="alert"><strong>{errors.first_name}</strong></span>
                                                            }
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <FormGroup
                                                        className={`mb-3 col-sm-7 ${errors.email && touched.email && 'has-danger focused'}`}>
                                                        <label>Email</label>

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
                                                    {/*<FormGroup*/}
                                                    {/*    className={`mb-3 col-sm-5 ${errors.phone && touched.phone && 'has-danger focused'}`}>*/}
                                                    {/*    <label>Phone Number</label>*/}

                                                    {/*    <InputGroup*/}
                                                    {/*        className="input-group-alternative input-group input-group-alternative"*/}
                                                    {/*        focused>*/}
                                                    {/*        <InputGroupAddon addonType="prepend">*/}
                                                    {/*            <InputGroupText>*/}
                                                    {/*                <FaPhoneAlt/>*/}
                                                    {/*            </InputGroupText>*/}
                                                    {/*        </InputGroupAddon>*/}
                                                    {/*        <Input placeholder="Phone" type="tel"*/}
                                                    {/*               name="phone" invalid*/}
                                                    {/*               onChange={handleChange}*/}
                                                    {/*               onBlur={handleBlur}*/}
                                                    {/*               value={values.phone}/>*/}
                                                    {/*    </InputGroup>*/}
                                                    {/*    {errors.phone && touched.phone &&*/}
                                                    {/*    <span className="invalid-feedback " style={{display: 'block'}}*/}
                                                    {/*          role="alert"><strong>{errors.phone}</strong></span>*/}
                                                    {/*    }*/}
                                                    {/*</FormGroup>*/}

                                                </Row>
                                                <FormGroup
                                                    className={`mb-1  ${errors.password && touched.password && 'has-danger focused'}`}>
                                                    <label>Secure Password</label>

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

                                                <div className="form-group mt-3">
                                                    <label>Enter the closest landmark to you. E.g Ikeja Airport</label>
                                                    <InputGroup className="input-group-alternative">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-pin-3"/>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <SearchLocation
                                                            panTo={panTo}
                                                            setLocation={location => this.setState({location})}
                                                            location={location}
                                                            setMarker={marker => this.setState({marker})}
                                                        />
                                                    </InputGroup>
                                                </div>

                                                <FormGroup className="mt-3 mb-5">
                                                    <label>What will you like to do on the platform</label>
                                                    <Row className="px-3">
                                                        {/* <Col> */}
                                                        <div
                                                            className="custom-control custom-control-alternative  custom-checkbox">
                                                            <input
                                                                name="get_things_done" value="1"
                                                                onChange={() => this.setState({get_things_done: !get_things_done})}
                                                                className="custom-control-input" id="get_things_done"
                                                                type="checkbox"/>
                                                            <label className="custom-control-label"
                                                                   htmlFor="get_things_done">
                                                                <span>Get things done</span>
                                                            </label>
                                                        </div>
                                                        <div
                                                            className="custom-control ml-4 custom-control-alternative custom-checkbox">
                                                            <input name="earn_money" value="1"
                                                                   onChange={() => this.setState({earn_money: !earn_money})}
                                                                   className="custom-control-input" id="earn"
                                                                   type="checkbox"/>
                                                            <label className="custom-control-label" htmlFor="earn">
                                                                <span>Earn Money</span>
                                                            </label>
                                                        </div>
                                                    </Row>
                                                </FormGroup>
                                                <div className="custom-control
                                                custom-control-alternative mt-3 custom-checkbox">
                                                    <input className="custom-control-input bg-dark" required
                                                           id=" customCheckLogin"
                                                           type="checkbox"/>
                                                    <label className="custom-control-label" htmlFor=" customCheckLogin">
                                                    <span>By signing up, I agree to CitiTasker's <NavLink to={'/terms'}>Terms & Conditions,</NavLink> and
                                                            <NavLink to={'/terms'}> Community Guidelines.</NavLink>
                                                        <NavLink to={'/privacy'}> Privacy Policy.</NavLink></span>
                                                    </label>
                                                </div>
                                                <div className="text-center">
                                                    <Button className="mt-4 btn-round" style={{width: '60%'}}
                                                            disabled={isSubmitting}
                                                            type="submit"
                                                            color="primary">
                                                        {!isSubmitting ? 'Create account' :
                                                            <Spinner color="white"/>
                                                        }
                                                    </Button>
                                                </div>
                                            </Form>
                                        )}
                                </Formik>
                                <div className="text-center mt-5">
                                    Already have an account ? <NavLink to={'/login'}>Login</NavLink>
                                </div>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
}
export default connect(mapStateToProps, {register, setUser, fetchUser})(Register);
