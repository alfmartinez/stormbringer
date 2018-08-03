import React, {Component} from 'react';
import './App.css';
import {Note} from "./Note";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Note title="Event Displayed" type="event" x={132} y={164}/>
                <Note title="Graphics Renderer" type="aggregate" x={100} y={100}/>
            </div>
        );
    }
}

export default App;
