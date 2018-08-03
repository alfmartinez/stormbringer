import React from "react";

export class Note extends React.Component {
    render() {
        const {title, type, x, y} = this.props;
        const sizeClass = type=="aggregate" ? "large-note":"note";
        return (
            <div title={title} className={type + " " + sizeClass } style={{top: x+"px", left: y+"px"}}>
                <span className="label">{title}</span>
            </div>
        );
    }
}