import React from "react";
import './Note.css';

export class Note extends React.Component {
    render() {
        const {id, title, type, position} = this.props;
        const sizeClass = type=="aggregate" ? "large-note":"note";
        return (
            <div id={id} title={title} className={type + " " + sizeClass } style={{top: position.x+"px", left: position.y+"px"}}>
                <span className="label">{title}</span>
            </div>
        );
    }
}