import React, {Component} from 'react';
import "./ElementForm.css";

export class ElementForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
            data: {

            }
        }
    }

    render() {
        return this.state.show ? (
            <div className="ElementForm">
                Element form
            </div>
        ): '';
    }
}