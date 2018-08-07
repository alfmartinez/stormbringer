import React, {Component} from "react";
import {DataLoader} from "./DataLoader";
import {DownloadLink} from "./DownloadLink";
import {NewElementButton} from "./NewElementButton";


export class Toolbar extends Component {
    render() {
        return <div className="tools">
            <DataLoader/>
            <NewElementButton />
            <DownloadLink/>
        </div>;
    }
}

