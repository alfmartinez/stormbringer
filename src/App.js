import React, {Component} from 'react';
import './App.css';
import {Note} from "./Note";

class App extends Component {
    render() {
        const state = [{
            id: 'evt_001',
            title: "Event Displayed",
            type: "event",
            position: {x:132, y:164}
        }, {
            id: 'agg_001',
            title: "Graphics Renderer",
            type: "aggregate",
            position: {x:100, y:100}
        }];
        return (
            <div className="App">
                { state.map((note,idx) => <Note key={idx} {...note} />) }
            </div>
        );
    }
}

export default App;
