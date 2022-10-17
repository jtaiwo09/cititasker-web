import React, { Component } from "react";
import Layout from "../components/Layout";
class _404 extends Component {
    render() {
        return (
            <Layout>
                <div style={{ paddingTop: 0, paddingBottom: 180, textAlign: 'center' }}>
                    <img src="/images/404.png" alt="404" className="mx-auto col-10 col-sm-7" />
                    <h2 style={{ textTransform: 'uppercase' }}>
                        PAGE NOT FOUND
                    </h2>
                </div>
            </Layout>
        );
    }
}

export class _500 extends Component {
    render() {
        return (
            <Layout>
                <div style={{ paddingTop: 0, paddingBottom: 180, textAlign: 'center' }}>
                    <img src="/images/500.png" alt="404" className="mx-auto col-10 col-sm-7" />
                    <h2 style={{ textTransform: 'uppercase' }}>
                        PAGE NOT FOUND
                    </h2>
                </div>
            </Layout>
        );
    }
}

export default _404;
