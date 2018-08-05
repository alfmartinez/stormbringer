import React, {Component} from 'react';
import {elements} from "../data/elements";
import * as PubSub from "pubsub-js";
import './DownloadLink.css';

export class DownloadLink extends Component {

    constructor(props) {
        super(props);
        this.state = elements;
    }

    componentWillMount() {
        this.observer = PubSub.subscribe('Storm.Save', this.subscriber.bind(this));
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.observer);
    }

    subscriber(msg, data) {
        this.setState(data);
    }

    render(){
        return (
            <a className="download-button"
                href={
                "data:application/octet-stream;" +
                "charset=utf-16le;base64,"
                + btoa(JSON.stringify(this.state))
            }>Download</a>
        );
    }
}