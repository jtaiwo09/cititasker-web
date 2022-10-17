import React, {Component} from "react";
import UserLayout from "../../layouts/UserLayout";

class PaymentMethod extends Component<{}> {
    render() {
        return (
            <UserLayout>
                <div className="px-3">
                    <h1>Payment Methods</h1>
                    {/*<div>*/}
                    {/*    <div className="d-flex">*/}
                    {/*        <a href="./#">Make Payments</a>*/}
                    {/*        <a href="./#">Receive Payments</a>*/}
                    {/*    </div>*/}
                    {/*    <p className="fs-12 ff-500 p-0 ">*/}
                    {/*        When you are ready to accept a Tasker's offer, you will be required to pay for the task*/}
                    {/*        using Cititasker Pay. Payment will be held securely until the task is complete and you*/}
                    {/*        release payment to the Tasker.*/}
                    {/*    </p>*/}
                    {/*    <h4 className="m-0 p-0">CREDIT CARD</h4>*/}
                    {/*    <a href="./#"> Add your credit card</a>*/}

                    {/*    <h4 className="m-0 p-0">AIRTASKER CREDITS</h4>*/}
                    {/*    <h5 className="m-0 p-0">Balance:</h5>*/}
                    {/*    <h2 className="fs-40 text-primary">$0</h2>*/}
                    {/*    <p className="p-0">*/}
                    {/*        Your Cititasker Credit balance will be automatically applied when you accept an offer on a*/}
                    {/*        task.</p>*/}
                    {/*</div>*/}


                </div>
            </UserLayout>
        );
    }
}

export default PaymentMethod
