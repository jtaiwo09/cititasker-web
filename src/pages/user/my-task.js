import React, {Component} from "react";
import UserLayout from "../../layouts/UserLayout";
import {GrSearch} from "react-icons/gr";
import {TaskCard} from "../../components/Common";
import {AppService} from '../../services/'
import {catchError} from "../../utils";
import GoogleMapReact from "google-map-react";
import {connect} from "react-redux";
import {togglePostATask} from "../../store/modules/app";
import Spinner from "reactstrap/es/Spinner";

// class OfferCard extends Component<{ text: any }> {
//     render() {
//         let {text} = this.props;
//         return (
//             <div className="p-4 bg-white" style={{width: 300}}>
//                 <div className="d-flex">
//                     <img className="col"/>
//                     <div className="col justified " style={{height: 126, backgroundColor: '#fff'}}>
//                         <span>EARN</span>
//                         <span>$ 250</span>
//                     </div>
//                 </div>
//
//                 <div>
//                     <p className="m-0 p-0">Title</p>
//                     <p className="m-0 p-0">Text</p>
//                     <p><span>3 Min ago</span></p>
//                 </div>
//                 <button className="w-100 btn btn-success btn-round">
//                     View Task
//                 </button>
//             </div>
//         );
//     }
// }


class MyMarker extends Component<{ text: any, tooltip: any, $hover: any }> {
    state = {clicked: false}

    render() {
        let {
            // text, tooltip,
            $hover} = this.props;
        // const handleClick = () => {
        //     this.setState({clicked: true})
        // };

        return (
            <div className={$hover ? "circle hover" : "circle"}>
                <img alt={'...'} src={'https://www.airtasker.com/images/map_marker.png'}/>
            </div>
        );
    }
}

export class BrowseTaskExtraNav extends Component {


    render() {
        const {getUserTask, status} = this.props
        return (
            <div style={{zIndex: 10}}
                 className="pt-5 pt-sm-1 position-relative w-100 bg-white secondary-menu sticky-header">
                <div className="col-sm-10 d-flex mx-auto px-sm-4 pt-5 mt-3 mt-sm-2 ">
                    <div className="aligned spaced w-100 py-2 ff-500">
                        <div className="">
                            <div className="aligned web-button">
                                <button onClick={() => this.props.getUserTask('ALL')} className="extra-menu btn-transparent">
                                    <span
                                        className={status === '' || status === 'ALL' ? "text-primary" : ""}>All tasks</span>
                                </button>
                                <button onClick={() => this.props.getUserTask('OPEN')} className="extra-menu btn-transparent">
                                    <span className={status === 'OPEN' ? "text-primary" : ''}>Posted Tasks</span>
                                </button>
                                <button onClick={() => this.props.getUserTask('DRAFT')} className="extra-menu btn-transparent">
                                    <span className={status === 'DRAFT' ? "text-primary" : ''}>Draft Tasks</span>
                                </button>
                                <button onClick={() => this.props.getUserTask('ASSIGNED')} className="extra-menu btn-transparent">
                                    <span className={status === 'ASSIGNED' ? "text-primary" : ''}>Task Assigned</span>
                                </button>
                                <button onClick={() => this.props.getUserTask('OPEN')} className="extra-menu btn-transparent">
                                    <span className={status === 'OPEN' ? "text-primary" : ''}>Offers Pending</span>
                                </button>
                                <button onClick={() => this.props.getUserTask('COMPLETED')} className="extra-menu btn-transparent">
                                    <span className={status === 'COMPLETED' ? "text-primary" : ''}>Task Completed</span>
                                </button>
                            </div>
                            <select
                                onChange={e => getUserTask(e.target.value)}
                                className="form-control mobile-button">
                                <option value="ALL">All tasks</option>
                                <option value="OPEN">Posted tasks</option>
                                <option value="DRAFT">Draft tasks</option>
                                <option value="ASSIGNED">Task assigned</option>
                                <option value="OPEN">Offers pending</option>
                                <option value="COMPLETED">Task completed</option>
                            </select>
                        </div>
                        <div className="radius-28 border border-gray-300 p-2">
                            <input className="border-0 mr-4 fs-12 ff-700" type="text" placeholder="Search for a task"
                                   value=""/>
                            <button className="btn-empty ">
                                <GrSearch/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class MyTask extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            listData: [], lat: 6.5244, lng: 3.3792, isLoading: false, status: '',
        }
    }

    componentDidMount(): void {
        this.getUserTask();
        const AppState = this;
        if ("geolocation" in navigator) {
            console.log("Available");
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                AppState.setState({lat: position.coords.latitude, lng: position.coords.longitude})
            });
        } else {
            console.log("Not Available");
        }
    }

    getUserTask = (status = 'ALL') => {
        this.setState({isLoading: true, status})
        AppService.getUserTask(status).then(({data}) => {
            this.setState({listData: data.data || []})
        }).catch(catchError).finally(() => this.setState({isLoading: false}));
    };

    searchUserTask = (keyword = '') => {
        this.setState({isLoading: true, search: true})
        AppService.getUserTask(keyword).then(({data}) => {
            this.setState({listData: data.data || []})
        }).catch(catchError).finally(() => this.setState({isLoading: false}));
    };

    render() {

        return (
            <UserLayout
                noSidebar transparent bgWhite noFooter
                onRef={(ref) => this.userLayout = ref}
                renderExtraNav={<BrowseTaskExtraNav
                    getUserTask={this.getUserTask}
                    status={this.state.status}
                    onRef={ref => this.browseTask = ref}/>}
            >
                {this.renderView()}
            </UserLayout>
        );
    }

    renderView() {
        const {listData, lng, lat, isLoading} = this.state;
        if (isLoading) {
            return (
                <div
                    className="px-3 text-center w-100 d-flex justify-content-center align-items-center min-vh-100 vh-100">
                    <Spinner/>
                </div>
            )
        }
        if (listData.length) {
            return (<div style={{zIndex: 1}} className="flex-fill main-wrapper">
                <div className="d-flex" style={{marginTop: 0}}>
                    <div style={{width: '95%', minHeight: '88vh'}}
                         className="d-block bg-white d-sm-none mx-auto px-1">
                        {
                            listData.map((data, key) => {
                                return <TaskCard key={key} data={data}/>
                            })
                        }
                    </div>

                    <div style={{width: 320, minHeight: '88vh'}}
                         className="d-none d-sm-block fixed scroll-vertical">
                        {
                            listData.map((data, key) => {
                                return <TaskCard key={key} data={data}/>
                            })
                        }
                    </div>

                    <div className="d-none d-sm-block bg-white scroll-vertical" style={{flex: 1,}}>
                        <GoogleMapReact
                            bootstrapURLKeys={{
                                key: "AIzaSyDdHMB87WgSAdWlbEiORryX6ttcBiIwJC8", language: "en", region: "US"
                            }}
                            defaultCenter={{lat, lng}}
                            defaultZoom={12}
                        >
                            <MyMarker lat={lat} lng={lng} text={'My Location'} tooltip={'Location'}/>
                        </GoogleMapReact>
                    </div>

                </div>
            </div>);
        }
        return (
            <div className="px-3 text-center w-100 d-flex flex-column min-vh-100 vh-100">

                <img src="/images/empty-list.png" className="mx-auto mt-5" alt="no data" style={{width: 300}}/>
                <p className="pb-0 mb-2">
                    Looks like you haven’t posted a task or made any offers just yet. How about
                    posting one now?
                </p>
                <div className="text-center mt-3">
                    <button onClick={() => this.props.togglePostATask()}
                            className="btn btn-round btn-danger">
                        POST A TASK
                    </button>
                </div>
            </div>
        )
    }


}

export default connect(null, {togglePostATask})(MyTask);
