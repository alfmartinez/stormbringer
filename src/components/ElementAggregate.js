import React, {Component} from "react";
import * as PubSub from "pubsub-js";
import StormingBoard from "./StormingBoard";

const initialState = {
    elements: []
};


export class ElementAggregate extends Component {

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

    componentWillUpdate(nextProps, nextState) {
        PubSub.publish('Storm.Save', nextState.elements);
    }

    subscriber(msg, data) {
        switch (msg) {
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
            //
        }
    }

    createElement(data) {
        this.setState({
            elements: [
                ...(this.state.elements),
                data
            ]
        });
    }

    updateElementPosition(data) {
        this.changeElements(data, (data, element) => ({
            ...element,
            position: data.position
        }));
    }


    updateElements(data) {
        this.changeElements(data, (data) => (data));
    }

    changeElements(data, fn) {
        const elements = this.state.elements.map(element => {
            if (element.id === data.id) {
                return fn(data, element);
            } else {
                return element;
            }
        });
        this.setState({elements});
    }
    render() {
        return <div className="Main">
            <StormingBoard elements={this.state.elements}/>
        </div>;
    }
}
