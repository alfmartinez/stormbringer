import React, {Component} from 'react';
import {Note} from "./Note";

class StormingBoard extends Component {
    render() {
        const {elements} = this.props;
        return (
            <div className="App">
                { elements.map((note,idx) => <Note key={idx} {...note} />) }
            </div>
        );
    }
}

export default StormingBoard;
