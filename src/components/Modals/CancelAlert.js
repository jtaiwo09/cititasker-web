import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter} from 'reactstrap';
import {GrClose} from "react-icons/gr";

class PostTask extends Component {
    state = {step: 2, inPerson: true};

    processForm = () => {
        const {step} = this.state
        this.setState({step: step + 1})
    };
    previousForm = () => {
        const {step} = this.state
        this.setState({step: (step - 1)})
    };


    render() {
        const {buttonLabel, togglePostATask, showPostTaskModal, className} = this.props;
        return (
            <div>
                <Modal isOpen={true || showPostTaskModal}
                       toggle={togglePostATask} className={className}
                       backdrop={'static'}
                       keyboard>
                    <div className="d-flex justify-content-between align-items-center w-100 px-4 py-4">
                        <h3 className="mx-auto mb-0">Whoop!!!</h3>
                        <GrClose onClick={togglePostATask}/>
                    </div>
                    <ModalBody className="py-2">
                        <span>
                            Are you sure? You're almost done and it's free to post a task...
                        </span>
                    </ModalBody>
                    <ModalFooter className="text-center">
                        <button className="btn btn-round mx-auto btn-outline-primary"
                                style={{width: '43%'}} onClick={this.previousForm}>Continue Task
                        </button>

                        <Button color="danger" className="btn btn-round mx-auto"
                                style={{width: '43%'}}
                                onClick={this.processForm}>Discard & Exit</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default PostTask;
