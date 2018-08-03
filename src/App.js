import StormingBoard from "./StormingBoard";
import React, {Component} from "react";
import './App.css';

export class App extends Component {
    render() {

        const elements = [{
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
            <StormingBoard elements={elements}/>
        );
    }
};