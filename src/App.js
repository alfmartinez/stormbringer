import StormingBoard from "./StormingBoard";
import React, {Component} from "react";
import {elements} from "./elements";
import './App.css';

export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {elements: elements};
    }

    render() {
        return (
            <div className="App">
                <StormingBoard elements={this.state.elements}/>
            </div>
        );
    }
};