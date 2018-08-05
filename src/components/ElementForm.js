import React, {Component} from 'react';
import "./ElementForm.css";
import * as PubSub from "pubsub-js";
import * as uuid from 'uuid/v4';

const initialState = {
    id:null,
    title:'',
    type:'event',
    position: {
        x:400,
        y:400
    }
};

export class ElementForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
            data: initialState
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        const data = {
            ...(this.state.data),
            [name]: value
        }
        this.setState({data});
    }

    handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        if (this.state.data.id) {
            PubSub.publish('Storm.Element.Replace', this.state.data);
        } else {
            const id = uuid();
            const values = this.state.data;
            const data = {
                ...values,
                id
            };
            PubSub.publish('Storm.Element.Create', data);
        }
        this.setState({show: false});
    }

    componentWillMount() {
        this.observer = PubSub.subscribe('Storm.Form', this.subscriber.bind(this));
    }

    subscriber(msg, data) {
        switch(msg) {
            case "Storm.Form.Show":
                this.setState({show: true});
                break;
            case "Storm.Form.Hide":
                this.setState({show: false});
                break;
            case "Storm.Form.Load":
                this.setState({data, show: true});
                break;
            case "Storm.Form.New":
                this.setState({data: initialState, show: true});
                break;
            default:
                console.log(msg, data);
        }
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.observer);
    }

    render() {
        return this.state.show ? (
            <form className="ElementForm" onSubmit={this.handleSubmit.bind(this)}>
                Title: &nbsp;
                <input id="form-element-title"
                       name="title"
                       type="text"
                       value={this.state.data.title}
                       onChange={this.handleInputChange.bind(this)}
                /><br />
                Type: &nbsp;
                <select id="form-element-type"
                       name="type"
                       value={this.state.data.type}
                       onChange={this.handleInputChange.bind(this)}
                >
                    <option value="event">Event</option>
                    <option value="aggregate">Aggregate</option>
                    <option value="command">Command</option>
                    <option value="issue">Issue</option>
                    <option value="persona">Persona</option>
                    <option value="view">View</option>
                </select><br />
                <input type="submit" value="Submit" />
            </form>
        ): '';
    }
}