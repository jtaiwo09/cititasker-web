import React from "react";
import {Field} from "formik";
import className from 'classname'

export const FormElements = ({message}) => (
    <p className="text-danger p-0 fs-12 d-block"><strong>{message}</strong></p>);
export const FormField = (props) => <Field component={CustomInputComponent} {...props} />;
export const FormArea = (props) => <Field component={CustomAreaComponent} {...props} />;
export const FormSelect = (props) => <Field component={CustomSelectComponent} {...props} />;

const CustomInputComponent = ({field, form: {touched, errors, isValid}, title, ...props}) => {
    const innerClass = className('form-group', {
        'has-error': touched[field.name] && errors[field.name]
    }, props.innerClass);

    return (
        <div className={innerClass}>
            {title && <label htmlFor={field.name} className="form__title">{title}</label>}
            <input type="text" id={field.name} disabled={props.disabled} className="form-control" {...field} {...props} />
            {errors[field.name] && touched[field.name] && <FormElements message={errors[field.name]}/>}
        </div>
    );
}
const CustomAreaComponent = ({field, form: {touched, errors, isValid}, title, ...props}) => {
    const innerClass = className('form-group', {
        'has-error': touched[field.name] && errors[field.name]
    }, props.innerClass);

    return (
        <div className={innerClass}>
            {title && <label htmlFor={field.name} className="form__title">{title}</label>}
            <input type="text" id={field.name} className="form-control" {...field} {...props} />
            {errors[field.name] && touched[field.name] && <FormElements message={errors[field.name]}/>}
        </div>
    );
}
const CustomSelectComponent = ({field, form: {touched, errors, isValid}, title, ...props}) => {
    const innerClass = className('form-group', 'form-group-select', {
        'has-error': touched[field.name] && errors[field.name]
    }, props.innerClass);

    return (
        <div className={innerClass}>
            {title && <label htmlFor={field.name} className="form__title">{title}</label>}
            <select id={field.name} className="form-control" {...field} {...props} />
            {errors[field.name] && touched[field.name] && <FormElements message={errors[field.name]}/>}
        </div>
    );
}

export const DetailsForm = ({service}) => <>
    <input type="hidden" name="service" value={service}/>
    <div className="request-title">
        <h2>{service} Request Info</h2>
        <p>Please make sure the details below are correct for this
            particular order </p>
    </div>
    <div className="row mb-10">
        <div className="col-12">
            <div className="form-group">
                <FormField type="text" className="form-control " name="name" placeholder="Full Name"/>
            </div>
        </div>
        <div className="col-12">
            <div className="form-group">
                <FormField type="tel" className="form-control " name="phone" placeholder="Phone Number"/>
            </div>
        </div>
    </div>

    <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 text-center">
            <button type="submit" className="btn btn__primary">Request a
                Quote
            </button>
        </div>
    </div>
</>;

