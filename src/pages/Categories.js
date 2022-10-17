import React, {Component} from "react";
import UnAuthenticatedLayout from "../layouts/UnAuthenticated";
import {NavLink} from "react-router-dom";
import {AiOutlineArrowRight} from 'react-icons/ai'
import {IoIosArrowForward} from 'react-icons/io'

const SideBar = (props) => {
    console.log(props.categories)
    return (
        <div className='w-100 p-0' style={{minWidth: 250}}>
            {
                props.categories && props.categories.map(link =>
                    <NavLink to={link.to} className="cat-item">
                        <span className="font-weight-700">{link.title}</span>
                        <AiOutlineArrowRight className="cat-hover"/>
                    </NavLink>
                )
            }
        </div>
    );
}

const categories = [
    {to: '/categories/accounting', title: 'Accounting'}
];


class Terms extends Component {
    render() {
        return (
            <UnAuthenticatedLayout sideBar={<SideBar categories={categories}/>} transparent={false}>
                <div className="px-3">
                    <h2 color="#292b32" className="fw-400">
                        <strong>Earn money on Cititasker</strong>
                    </h2>
                    <p className="fw-200 fs-16">
                        Cititasker is Australia's largest Job marketplace for
                        all kind of Jobs from handyman to cleaners to gardeners. Sign up now and Get Hired!
                    </p>

                    <div className="mt-5">
                        <div className="mt-2">
                            <a href="/jobs/accounting/">
                                <h2 color="#292b32">Accounting <IoIosArrowForward className="ml-1"/></h2>
                            </a>
                        </div>
                        <div className="d-flex flex-grow-1 spaced cat-list-block ">
                            <a href="/jobs/accounting/bookkeeping/">Bookkeeping</a>
                            <a href="/jobs/accounting/financial-modelling/">Financial Modelling</a>
                            <a href="/jobs/accounting/financial-planning/">Financial Planning</a>
                            <a href="/jobs/accounting/financial-reporting/">Financial Reporting</a>
                            <a href="/jobs/accounting/payroll-accountant/">Payroll Accountant</a>
                            <a href="/jobs/accounting/tax-accountants/">Tax Accountants</a>
                        </div>
                    </div>
                </div>
            </UnAuthenticatedLayout>
        );
    }
}

export default Terms;
