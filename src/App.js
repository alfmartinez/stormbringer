import StormingBoard from "./components/StormingBoard";
import React, {Component} from "react";
import {elements} from "./data/elements";
import './App.css';
import {ElementForm} from "./components/ElementForm";
import {DownloadLink} from "./components/DownloadLink";
import * as PubSub from "pubsub-js";
import {DataLoader} from "./components/DataLoader";

export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {elements: elements};
    }

    componentWillMount() {
        this.observer = PubSub.subscribe('Storm', this.subscriber.bind(this));
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.observer);
    }

    subscriber(msg, data) {
        console.log(msg, data);
        switch(msg) {
            case "Storm.Element.Replace":
                this.updateElements(data);
                break;
            case "Storm.Element.Create":
                this.setState({
                    elements: [
                        ...(this.state.elements),
                        data
                    ]});
                break;
            case "Storm.Element.Move":
                this.updateElementPosition(data);
                break;
            case "Storm.Load":
                console.log('Loading');
                this.setState({elements: data});
                break;
            default:
                console.log(msg, data);
        }
    }

    updateElementPosition(data) {
        const elements = this.state.elements.map(element => {
            if (element.id === data.id) {
                return {
                    ...element,
                    position: data.position
                };
            } else {
                return element;
            }
        });
        this.setState({elements});
    }

    updateElements(data) {
        const elements = this.state.elements.map(element => {
            if (element.id === data.id) {
                return data;
            } else {
                return element;
            }
        });
        this.setState({elements});
    }

    handleNew() {
        PubSub.publish('Storm.Form.New');
    }

    componentWillUpdate(nextProps, nextState) {
        PubSub.publish('Storm.Save', nextState.elements);
    }


    render() {
        return (
            <div className="App">
                <div className="">
                    <StormingBoard elements={this.state.elements}/>
                </div>
                <div className="tools">
                    <DataLoader/>
                    <button onClick={this.handleNew}>New Element</button>
                    <DownloadLink />
                </div>
                <ElementForm show={false}/>
            </div>
        );
    }
};