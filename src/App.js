import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="event note">
            <span class="label">Event Displayed</span>
        </div>
          <div className="aggregate large-note">
              <span className="label">Graphics Renderer</span>
          </div>
      </div>
    );
  }
}

export default App;
