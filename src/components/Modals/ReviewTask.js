import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { GrClose } from "react-icons/gr";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setAppState } from '../../store/modules/app/actions';

class ReviewTask extends Component {
    state = { step: 2, inPerson: true };

    processForm = () => {
        const { step } = this.state
        this.setState({ step: step + 1 })
    };
    previousForm = () => {
        const { step } = this.state
        this.setState({ step: (step - 1) })
    };


    render() {
        const { showReview, className } = this.props;
        const togglePostATask = this.props.setAppState({ showReview: !showReview })
        return (
            <div>
                <Modal isOpen={showReview}
                    toggle={togglePostATask} className={className}
                    backdrop={'static'}
                    keyboard>
                    <div className="d-flex justify-content-between align-items-center w-100 px-4 py-4">
                        <h3 className="mx-auto mb-0">Whoop!!!</h3>
                        <GrClose onClick={togglePostATask} />
                    </div>
                    <ModalBody className="py-2">
                        <span>
                            Are you sure? You're almost done and it's free to post a task...
                        </span>
                    </ModalBody>
                    <ModalFooter className="text-center">
                        <button className="btn btn-round mx-auto btn-outline-primary"
                            style={{ width: '43%' }} onClick={this.previousForm}>Continue Task
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect(({ Application: { showReview, task, myOffer }, User: user }) => ({
    showReview, user, task, myOffer
}), { setAppState })(ReviewTask);