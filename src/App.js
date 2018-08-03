import React, {Component} from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="event note" style={{top: "132px", left: "164px"}}>
                    <span className="label">Event Displayed</span>
                </div>
                <div className="aggregate large-note" style={{top: "100px", left: "100px"}}>
                    <span className="label">Graphics Renderer</span>
                </div>
            </div>
        );
    }
}

export default App;
