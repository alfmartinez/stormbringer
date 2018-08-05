import React, {Component} from 'react';
import './DownloadLink.css';

export class DownloadLink extends Component {
    render(){
        const {data} = this.props;
        return (
            <a className="download-button"
               download="eventStorming.json"
                href={
                "data:application/octet-stream;" +
                "charset=utf-16le;base64,"
                + btoa(JSON.stringify(data))
            }>Download</a>
        );
    }
}