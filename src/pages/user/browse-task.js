import React, {Component} from "react";
import {TaskCard} from "../../components/Common";
import {AppService} from '../../services/'
import {catchError} from "../../utils";
import Layout from "../../components/Layout";
import GoogleMapReact from "google-map-react";


class MyMarker extends Component<{ text: any, tooltip: any, $hover: any }> {
    state = {clicked: false}

    render() {
        let {$hover, data} = this.props;
        const handleClick = () => {
            this.setState({clicked: true})
        };
        if (this.state.clicked) {
            return <div style={{width: 330}}>
                <TaskCard data={data}/>
            </div>

        }
        return (
            <div className={$hover ? "circle hover" : "circle"} onClick={handleClick}>
                <img alt={'...'} style={{height: 57, width: 42}} src={'/images/icon.png'}/>
            </div>
        );
    }
}

class BrowseTask extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            listData: [], lat: 6.5244, lng: 3.3792
        }
    }

    componentDidMount(): void {
        AppService.allTask().then(({data}) => {
            this.setState({listData: data.data || []})
        }).catch(catchError);

        const AppState = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position)
                AppState.setState({lat: position.coords.latitude, lng: position.coords.longitude})
            });
        } else {
            AppState.setState({lat: 6.5244, lng: 3.3792})
        }
    }


    render() {
        const {listData, lng, lat} = this.state
        return (
            <Layout noSidebar bgWhite noFooter>
                <div className={`vw-100 d-flex bg-white`}>
                    <div className={`w-1024 d-flex mx-auto max-vh-100 bg-white`}>
                        <div className="flex-fill main-wrapper  ">
                            <div className="d-flex  " style={{marginTop: 0}}>
                                <div style={{width: '95%', minHeight: '88vh'}}
                                     className="d-block bg-white d-sm-none mx-auto px-1">
                                    {
                                        listData.length ? listData.map((data, key) => {
                                                return <TaskCard key={key} data={data}/>
                                            }) :
                                            <span className="text-center">No task yet</span>
                                    }

                                </div>

                                <div style={{width: 320, minHeight: '83vh', maxHeight: '84vh'}}
                                     className="d-none d-sm-block fixed scroll-vertical">
                                    {
                                        listData.length ? listData.map((data, key) => {
                                                return <TaskCard key={key} data={data}/>
                                            }) :
                                            <span className="text-center">No task yet</span>
                                    }
                                </div>

                                <div className="d-none d-sm-block bg-white scroll-vertical"
                                     style={{flex: 1, minHeight: '83vh', maxHeight: '84vh'}}>


                                    <GoogleMapReact
                                        bootstrapURLKeys={{
                                            key: "AIzaSyDdHMB87WgSAdWlbEiORryX6ttcBiIwJC8", language: "en",
                                        }}
                                        defaultCenter={{lat, lng}}
                                        defaultZoom={12}
                                    >
                                        {listData.map(({lat, lng, id, location, ...data}) => {
                                            if (location) {
                                                return (
                                                    <MyMarker
                                                        key={id}
                                                        lat={location?.lat}
                                                        lng={location?.lng}
                                                        text={id} data={data}
                                                        tooltip={data.title}
                                                    />
                                                );
                                            }
                                            return null
                                        })}
                                    </GoogleMapReact>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default BrowseTask

