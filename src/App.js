import StormingBoard from "./components/StormingBoard";
import React, {Component} from "react";
import './App.css';
import {ElementForm} from "./components/ElementForm";
import * as PubSub from "pubsub-js";
import {Toolbar} from "./components/Toolbar";

const initialState = {
    elements: [],
    edit: false
};

export class App extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentWillMount() {
        this.observer = PubSub.subscribe('Storm', this.subscriber.bind(this));
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.observer);
    }

    subscriber(msg, data) {
        switch(msg) {
            case "Storm.Form.New":
            case "Storm.Form.Show":
                this.setState({edit: true});
                break;
            case "Storm.Element.Replace":
                this.updateElements(data);
                break;
            case "Storm.Element.Create":
                this.createElement(data);
                break;
            case "Storm.Element.Move":
                this.updateElementPosition(data);
                break;
            case "Storm.Load":
                this.setState(initialState, () => {
                    this.setState({elements: data});
                });
                break;
            default:
                console.log(msg, data);
        }
    }

    createElement(data) {
        this.setState({
            elements: [
                ...(this.state.elements),
                data
            ],
            edit: false
        });
    }

    updateElementPosition(data) {
        const elements = this.appyToElement(data, (data,element) => ({
            ...element,
            position: data.position
        }));
        this.setState({elements});
    }

    appyToElement(data, fn) {
        return this.state.elements.map(element => {
            if (element.id === data.id) {
                return fn(data,element);
            } else {
                return element;
            }
        });
    }

    updateElements(data) {
        const elements = this.appyToElement(data, (data) => data);
        this.setState({
            elements,
            edit: false
        });
    }



    componentWillUpdate(nextProps, nextState) {
        PubSub.publish('Storm.Save', nextState.elements);
    }


    render() {
        return (
            <div className="App">
                <div className="Main">
                    <StormingBoard elements={this.state.elements}/>
                </div>
                <Toolbar handleNew={function (){
        PubSub.publish('Storm.Form.New');
    }} elements={this.state.elements}/>
                {this.state.edit ? <ElementForm/> : ''}
            </div>
        );
    }
};