import React, {Component} from "react";
import {Banner2, Posts, SomeTasker, TaskButtonRow, WhyChooseUs} from "./partials";
import Layout from "../../components/Layout";
import {HowItWorks} from "../tasker/partials";

class Home extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <Layout {...this.props} light banner>
                <Banner2 {...this.props} />
                <TaskButtonRow {...this.props} />
                <Posts {...this.props} />
                <HowItWorks {...this.props} />
                <SomeTasker {...this.props} />
                <WhyChooseUs {...this.props} />
            </Layout>
        );
    }
}

export default Home;
