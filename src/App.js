import StormingBoard from "./StormingBoard";
import React, {Component} from "react";
import {elements} from "./elements";
import './App.css';
import {ElementForm} from "./ElementForm";
import * as PubSub from "pubsub-js";

export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {elements: elements};
    }

    componentWillMount() {
        this.observer = PubSub.subscribe('Element', this.subscriber.bind(this));
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.observer);
    }

    subscriber(msg, data) {
        console.log(msg, data);
        switch(msg) {
            case "Element.Replace":
                break;
            case "Element.Create":
                this.setState({
                    elements: [
                        ...(this.state.elements),
                        data
                    ]});
                break;
            default:
                console.log(msg, data);
        }
    }

    handleNew() {
        PubSub.publish('Form.New');
    }

    render() {
        return (
            <div className="App">
                <div className="">
                    <StormingBoard elements={this.state.elements}/>
                </div>
                <div className="tools">
                    <ElementForm show={false}/>
                    <button onClick={this.handleNew}>New Element</button>
                </div>
            </div>
        );
    }
};