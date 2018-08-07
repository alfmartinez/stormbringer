import React, {Component} from "react";
import './App.css';
import {ElementForm} from "./components/ElementForm";
import * as PubSub from "pubsub-js";
import {Toolbar} from "./components/Toolbar";
import {ElementAggregate} from "./components/ElementAggregate";

const initialState = {
    edit: false
};

export class App extends Component {

    constructor() {
        super();
        this.state = initialState;
    }

    componentWillMount() {
        this.observer = PubSub.subscribe('Storm', this.subscriber.bind(this));
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.observer);
    }

    subscriber(msg) {
        switch(msg) {
            case "Storm.Form.New":
            case "Storm.Form.Show":
                this.setState({edit: true});
                break;
            case "Storm.Element.Replace":
            case "Storm.Element.Create":
                this.setState({edit: false});
                break;
            default:
                //
        }
    }

    render() {
        return (
            <div className="App">
                <ElementAggregate />
                <Toolbar handleNew={function () {
                    PubSub.publish('Storm.Form.New');
                }} elements={this.state.elements}/>
                {this.state.edit ? <ElementForm/> : ''}
            </div>
        );
    }
};