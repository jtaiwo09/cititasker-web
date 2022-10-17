import React, {Component} from "react";

const faqs = [{
    question: 'What type of tasks are available on CitiTasker?',
    answer: 'There’s a wide range of tasks on CitiTasker. From tasks that can be done in-person such as home cleaning, gardening, handyman, cake baking and photography to others tasks that can be done remotely such as graphic design and web delopement. There are other professional tasks such as architect, marketing and accounting.'
},
    {
        question: 'What’s required to become a Tasker?'
        ,
        answer: 'Be at least 18 yeares old. All Taskers must meet this age requirement in order to perform tasks. Provide us with personal information for ID verification and must have an account with a financial institution. Your personal information is securely stored and maintained in accordance with our privacy policy.'
    },
    {
        question: 'How do I become a Tasker?',
        answer: 'You have to be registered on CitiTasker to be a Tasker. Create an account on our website, it only takes a minute and costs nothing. Jumpstart your reputation by setting up your profile, set your skills and verify your info.'
    },

    {
        question: 'How do I get paid?',
        answer: 'You get paid for the task you do in a timely manner through our secure payment system. We hold payments secure in CitiTasker pay escrow account until task is completed. When you have completed the task and request payment, the Poster will be automatically notified to release the task payment held in Escrow.<br/>CitiTasker automatically deducts a service fee when the payment is released to include variable transactional and insurance cost and also ongoing maintenance costs to continually improve and develop the CitiTasker platform, maximizing your opportunity to earn more.'
    },
    {
        question: 'Who will I be working with?',
        answer: 'You have the freedom to decide who you want to work with. When browsing tasks, you can view Poster’s profile and past reviews to see if you would like to help them complete their task.'
    },
    {
        question: 'Who will I be working with?',
        answer: ' It’s totally up to you. You can check out profiles for reviews performance, recommendations and portfolio, to determine who you’ll be hiring for your task.'
    },
    {
        question: 'Is there insurance?',
        answer: 'CitiTasker insurance covers Taskers liability to the third parties for personal injury or property damage while performing most task activities (T&C apply) – so you can work with your mind at rest'
    },
    {
        question: 'How do I get assigned to a task by a Poster?',
        answer: 'It all starts by creating a great profile, highlighting your professional skills, experience and portfolio. Also, make a compelling offer and make sure you say why you’d be great for the task. This will greatly increase the likelihood of you getting assigned the task.'
    },
    {
        question: 'Can I get task alerts?',
        answer: 'Yes, definitely. Set up task alerts in your account settings and you will always receive instant notification for exclusive tasks and auditions, matched to your location and skill set.'
    }]


class Faq extends Component<{}> {
    render() {
        return <div className="col-sm-10 mx-auto my-3">
            <h3 className="text-center fs-24 fw-300  text-green ff-300">FAQ</h3>
            <div className="row ff-900 fs-14">
                {faqs && faqs.map(({question, answer}) => <div className="col-sm-6">
                    <div key={question} className="p-2">
                        <strong>{question}</strong>
                        <p dangerouslySetInnerHTML={{__html: answer}}/>
                    </div>
                </div>)}
            </div>
        </div>;
    }
}


export default Faq;
