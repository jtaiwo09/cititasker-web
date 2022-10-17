import React, {Component} from "react";
import {Modal, Spinner} from 'reactstrap';
import {connect} from "react-redux";


class Loader extends Component {
    render() {
        const {showLoader} = this.props;
        return (
            <div>
                <Modal isOpen={showLoader} toggle={() => {
                }} backdrop={'static'} contentClassName="bg-transparent" keyboard>
                    <div className="justified aligned  "
                         style={{minHeight: 500, backgroundColor: 'rgba(0,0,0,0.3)', width: '100%'}}>
                        <Spinner style={{width: '5rem', height: '5rem', borderWidth: 5}} color={'white'}/>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = ({Application: {showLoader}}) => ({showLoader : false});
export default connect(mapStateToProps, {})(Loader);

