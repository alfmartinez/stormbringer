import React, {Component} from 'react';
import * as PubSub from "pubsub-js";

export class DataLoader extends Component {

    readSingleFile(e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = (e) => {
            this.loadData(e.target.result);
        };
        reader.readAsText(file);
    }

    loadData(contents) {
        const obj = JSON.parse(contents);
        const data = Object.keys(obj).map(key => obj[key])
        PubSub.publish('Storm.Load', data);
    }

    render(){
        return (
            <input
                type="file"
                id="file-input"
                onChange={this.readSingleFile.bind(this)}
            />
        );
    }
}