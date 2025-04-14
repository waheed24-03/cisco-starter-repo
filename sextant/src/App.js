// src/App.js
import React from 'react';
import './App.css';
import Banner from './Banner';
import Exhibit from './Exhibit';

function App() {
  return (
    <div className="App">
      <Banner />
      
      {/* Example Exhibit with some placeholder content */}
      <Exhibit heading="User Networking Metrics">
        <div className="metric">
          <h3>Public IP</h3>
          <p>192.168.1.10</p>
        </div>
        <div className="metric">
          <h3>Latency</h3>
          <p>30ms</p>
        </div>
      </Exhibit>
    </div>
  );
}

export default App;
