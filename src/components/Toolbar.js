import React, {Component} from "react";
import {DataLoader} from "./DataLoader";
import {DownloadLink} from "./DownloadLink";
import * as PropTypes from "prop-types";
import * as PubSub from "pubsub-js";


export class Toolbar extends Component {
    render() {
        return <div className="tools">
            <DataLoader/>
            <button onClick={() => PubSub.publish('Storm.Form.New')}>
                New Element
            </button>
            <DownloadLink data={this.props.elements}/>
        </div>;
    }
}

Toolbar.propTypes = {
    elements: PropTypes.arrayOf(PropTypes.any)
};