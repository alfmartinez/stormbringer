import React from "react";
import Draggable from "react-draggable";
import * as PubSub from "pubsub-js";
import './Note.css';

export class Note extends React.Component {

    handleClick() {
        PubSub.publishSync('Storm.Form.Load', this.props);
    }

    handleStopDrag(event) {
        const {x,y} = event;
        const position = {x,y};
        const id = this.props.id;
        PubSub.publishSync('Storm.Element.Move', {position,id});
    }

    render() {
        const {id, title, type, position} = this.props;
        const sizeClass = type==="aggregate" ? "large-note":"note";
        return (
            <Draggable defaultPosition={position} onStop={this.handleStopDrag.bind(this)}>
                <div id={id} title={title} className={type + " " + sizeClass }>
                    <span className="label" onDoubleClick={this.handleClick.bind(this)}>{title}</span>
                </div>
            </Draggable>
        );
    }
}