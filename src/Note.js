import React from "react";
import './Note.css';
import * as PubSub from "pubsub-js";

export class Note extends React.Component {

    handleClick() {
        PubSub.publish('Form.Load', this.props);
    }

    render() {
        const {id, title, type, position} = this.props;
        const sizeClass = type==="aggregate" ? "large-note":"note";
        return (
            <div id={id} title={title} className={type + " " + sizeClass } style={{top: position.x+"px", left: position.y+"px"}}>
                <span className="label" onDoubleClick={this.handleClick.bind(this)}>{title}</span>
            </div>
        );
    }
}