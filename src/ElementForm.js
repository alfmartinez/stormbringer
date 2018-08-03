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
            PubSub.publish('Element.Replace', this.state.data);
        } else {
            const id = uuid();
            const values = this.state.data;
            const data = {
                id,
                ...values
            };
            PubSub.publish('Element.Create', data);
        }
        this.setState({show: false});
    }

    componentWillMount() {
        this.observer = PubSub.subscribe('Form', this.subscriber.bind(this));
    }

    subscriber(msg, data) {
        switch(msg) {
            case "Form.Show":
                this.setState({show: true});
                break;
            case "Form.Hide":
                this.setState({show: false});
                break;
            case "Form.Load":
                this.setState({data, show: true});
                break;
            case "Form.New":
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
                Title:
                <input id="form-element-title"
                       name="title"
                       type="text"
                       value={this.state.data.title}
                       onChange={this.handleInputChange.bind(this)}
                /><br />
                <input type="submit" value="Submit" />
            </form>
        ): '';
    }
}