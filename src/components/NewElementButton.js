import * as PubSub from "pubsub-js";
import React, {Component} from "react";

export class NewElementButton extends Component {
    render() {
        return (
            <button onClick={() => PubSub.publish('Storm.Form.New')}>
                New Element
            </button>
        );
    }
}