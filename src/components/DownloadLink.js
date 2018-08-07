import React, {Component} from 'react';
import './DownloadLink.css';
import * as PubSub from "pubsub-js";

export class DownloadLink extends Component {

    constructor() {
        super();
        this.state = {elements: []};
    }

    componentWillMount() {
        this.observer = PubSub.subscribe('Storm.Save', this.subscriber.bind(this));
    }

    subscriber(msg, elements) {
        switch(msg) {
            case "Storm.Save":
                this.setState({elements});
                break;
            default:
                //
        }
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.observer);
    }

    render(){
        return (
            <a className="download-button"
               download="eventStorming.json"
                href={
                "data:application/octet-stream;" +
                "charset=utf-16le;base64,"
                + btoa(JSON.stringify(this.state.elements))
            }>Download</a>
        );
    }
}