// src/App.js
import React from "react";
import PublicIP from "./PublicIP"; // Import PublicIP component
import Exhibit from "./Exhibit"; // Assuming you have an Exhibit component

function App() {
  return (
    <div className="App">
      <h1>Sextant - Public IP Viewer</h1>
      <Exhibit>
        <PublicIP type="v4" /> {/* Display IPv4 */}
      </Exhibit>
      <Exhibit>
        <PublicIP type="v6" /> {/* Display IPv6 */}
      </Exhibit>
    </div>
  );
}

export default App;
