import React, {Component, useEffect} from "react";
import UserLayout from "../../layouts/UserLayout";
import {Input, Label, Progress, Row} from "reactstrap";
import {connect} from "react-redux";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxOption, ComboboxPopover,} from "@reach/combobox";
import {fetchUser, loadUserDetails, setUser, updateProfile} from "../../store/modules/auth";
import {toast} from "react-toastify";
import {isNull} from "../../utils";


export function SearchLocation({location, className, name, style, setLocation, initialValue}) {
    const {value, suggestions: {status, data}, setValue, clearSuggestions,} = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => 9.082, lng: () => 8.6753,},
            radius: 200 * 1000,
        }
    });

    useEffect(() => {
        setValue(initialValue, false);
    }, [initialValue, setValue])

    return (
        <Combobox
            onSelect={async (address) => {
                setValue(address, false);
                clearSuggestions();
                try {
                    const results = await getGeocode({address});
                    const {lat, lng} = await getLatLng(results[0]);
                    setLocation({address, lat, lng, formatted_address: results[0].formatted_address});
                } catch (error) {
                    console.log(error);
                }
            }}
        >
            <div className="my-0 pb-0">
                <ComboboxInput
                    className={"form-control  fw-500 fs-16 " + className}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    // disabled={!ready}
                    placeholder={initialValue ? initialValue : "Enter new location"}
                />
                {status && (
                    <ComboboxPopover className="dropdown-menu list-index empty d-block">
                        {status === "OK" &&
                        data.map(({id, description}) => (
                            <ComboboxOption
                                className="dropdown-item list-index fs-16 "
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


class ProfileScreen extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {...this.props.user, marker: {}};
    }

    componentDidMount(): void {
        this.props.fetchUser();
    }

    processSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const {user: {location_object: location}} = this.props;
        form.append('location_object', JSON.stringify(location));
        if (location && location.hasOwnProperty('address'))
            form.append('location', location.address);
        this.props.updateProfile(form);
    };

    updateUser = (nodeUpdate) => this.props.setUser({...nodeUpdate});


    onSelectAvatar = (e) => {
        if (e.target.files && e.target.files[0]) {
            document.getElementById('avatar_pic').src
                = window.URL.createObjectURL(e.target.files[0]);
            this.setState({avatar: e.target.files[0]});

            document.getElementById('submit-btn').click();
            return
        }
        toast.warning('A file must be attached');
    };

    getProfileProgess() {
        const {user} = this.props, checkers = Object.keys(user),
            except = ['created_at', 'updated_at', 'id', 'email_verified_at', 'user_id', 'userdetail', 'deleted_at'];
        let progress = 0;
        except.forEach(key => {
            if (checkers.includes(key)) {
                checkers.splice(checkers.indexOf(key), 1);
            }
        });
        checkers.forEach((key) => {
            if (!isNull(user[key])) {
                progress += (100 / checkers.length)
            }
        });
        return Math.round(progress, 0)
    }

    getProfileProgessColor() {
        const va = this.getProfileProgess();
        return va < 21 ? 'error' : va < 61 ? 'warning' : va < 81 ? 'info' : 'success'
    }

    render() {
        const {user} = this.props;
        const {user: {location_object, location}} = this.props;
        return (
            <UserLayout>
                <div className=" user-profile">
                    <div className="px-4 d-sm-flex d-block justify-content-sm-between align-items-sm-center">
                        <h4>Account</h4>
                        <div className="profile-complete">
                            <div>Your profile is {this.getProfileProgess()}% complete</div>
                            <Progress color={this.getProfileProgessColor()} value={this.getProfileProgess()}/>
                        </div>
                    </div>
                    <form encType="multipart/form-data" method="post" onSubmit={this.processSubmit}
                          className="p-4 w-100">
                        <div className="form-group">
                            <label htmlFor="avatar-input">Upload Avatar</label>
                            <div className="aligned">
                                <div style={{width: 50, height: 50,}}>
                                    <input
                                        accept="image/*"
                                        id="avatar" onChange={this.onSelectAvatar}
                                        name="avatar" hidden type="file"/>
                                    <img
                                        alt="avatar" style={{width: '100%', borderRadius: 7, height: '100%'}}
                                        id="avatar_pic"
                                        src={user.avatar_url}/>
                                </div>
                                <div className="ml-3">
                                    <input type="file" hidden name=""/>
                                    <button type="button" onClick={() => {
                                        document.getElementById('avatar').click()
                                    }}
                                            className="btn btn-sm fs-10 ff-700 fw-700  btn-round btn-success">
                                        Upload photo
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-sm-5 ">
                                <div className="form-group">
                                    <label htmlFor="ui-test-first-name">First name</label>
                                    <input
                                        id="ui-test-first-name" className="form-control" name="first_name" required
                                        maxLength="30" onChange={(e) => this.updateUser({first_name: e.target.value})}
                                        type="text" value={user.first_name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ui-test-last-name">Last name</label>
                                    <input id="ui-test-last-name" required
                                           onChange={(e) => this.updateUser({last_name: e.target.value})}
                                           className="form-control" maxLength="30" name="last_name"
                                           type="text" value={user.last_name}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="ui-test-tagline">Tagline</label>
                                    <input id="ui-test-tagline" className="form-control" name="tagline"
                                           onChange={(e) => this.updateUser({tagline: e.target.value})}
                                           placeholder="Mini bio" type="text" value={user.tagline || ' '}/>
                                </div>

                                <div className="form-group">
                                    <label>Location</label>

                                    <SearchLocation
                                        initialValue={location}
                                        setLocation={loc => this.updateUser({location_object: loc})}
                                        location={location_object}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email-input" className="validated-input">Email</label>
                                    <input disabled id="email-input" className="form-control" type="email"
                                           name="email"
                                           onChange={(e) => this.updateUser({email: e.target.value})}
                                           value={user.email}/>
                                </div>
                                <div className="form-group">
                                    <label className="validated-input">Birthday </label>
                                    <Input
                                        onChange={(e) => this.updateUser({dob: e.target.value})}
                                        type="date" value={user && user.dob && user.dob.replace(' 00:00:00', '')}
                                        name="dob" className="form-control" id="exampleDate"
                                        max="2003-12-31"
                                        placeholder="date placeholder"
                                    />
                                </div>
                                {/*<div className="form-group">*/}
                                {/*    <label htmlFor="abn-input">ABN</label>*/}
                                {/*    <input id="abn-input" className="form-control"*/}
                                {/*           data-ui-test="abn-input" type="number"*/}
                                {/*           onChange={(e) => this.updateUser({abn: e.target.value})}*/}
                                {/*           value={user.abn}/>*/}
                                {/*</div>*/}
                                <div className="form-group">
                                    <label htmlFor="ui-test-description">Description</label>
                                    <textarea
                                        id="ui-test-description" rows={5} name="description"
                                        onChange={(description) => this.setState(description)}
                                        value={user.description}
                                        className="form-control">{user.description}</textarea>
                                </div>
                                <div className="mt-3"><Label>What will you like to do</Label></div>
                                <Row className="px-3">
                                    {/* <Col> */}
                                    <div
                                        className="custom-control custom-control-alternative  custom-checkbox">
                                        <input
                                            name="get_things_done" value={user.get_things_done ? 1 : 0}
                                            checked={user.get_things_done ? true : false}
                                            onChange={(e) => this.updateUser({get_things_done: !user.get_things_done})}
                                            className="custom-control-input" id="get_things_done" type="checkbox"/>
                                        <label className="custom-control-label" htmlFor="get_things_done">
                                            <span>Get things done</span>
                                        </label>
                                    </div>
                                    {/* </Col>
                                        <Col> */}
                                    <div className="custom-control ml-4 custom-control-alternative custom-checkbox">
                                        <input
                                            name="earn_money" value={user.earn_money ? 1 : 0}
                                            checked={user.earn_money ? true : false}
                                            onChange={(e) => this.updateUser({earn_money: !user.earn_money})}
                                            className="custom-control-input" id="earn" type="checkbox"/>
                                        <label className="custom-control-label" htmlFor="earn">
                                            <span>Earn Money</span>
                                        </label>
                                    </div>
                                    {/* </Col> */}
                                </Row>
                                <div>
                                    <button type="submit" id="submit-btn"
                                            className="btn-success mt-3 fs-12 fw-700 ff-700  btn btn-round">
                                        Save profile
                                    </button>
                                </div>
                                <div className="clearfix"/>
                            </div>
                        </div>
                    </form>
                    {/*<div className="mt-5 px-4 pt-3 border-top">*/}
                    {/*    <button type="button" className="btn btn-danger fs-12 fw-700 ff-700 btn-round">*/}
                    {/*        Deactivate my account*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = ({Auth, User, Application}) => {
    return {...Auth, user: User}
}

export default connect(mapStateToProps, {updateProfile, setUser, fetchUser, loadUserDetails})(ProfileScreen);
