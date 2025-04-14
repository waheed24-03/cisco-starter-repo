import React from 'react';
import './App.css';
import PublicLatency from './PublicLatency';  // Import the new component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Pylon Latency</h1>
        <PublicLatency />  {/* Display the PublicLatency component */}
      </header>
    </div>
  );
}

export default App;
