import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [latency, setLatency] = useState(null);
  const [latencyHistory, setLatencyHistory] = useState([]);

  const calculateAverageLatency = () => {
    if (latencyHistory.length > 0) {
      const totalLatency = latencyHistory.reduce((acc, val) => acc + val, 0);
      return totalLatency / latencyHistory.length;
    }
    return 0;
  };

  useEffect(() => {
    // WebSocket setup
    const socket = new WebSocket('ws://localhost:55455');
    socket.onopen = () => {
      console.log("Connected to Pylon server");
    };

    socket.onmessage = (event) => {
      const { data } = event;
      console.log("Received data:", data);  // Log received data

      const receivedTimestamp = Date.now();

      try {
        const parsedData = JSON.parse(data);
        const { data: timestamp } = parsedData;  // Destructure 'data' to get the timestamp

        console.log("Parsed Timestamp:", timestamp);  // Log parsed timestamp

        if (timestamp) {
          const roundTripLatency = receivedTimestamp - timestamp;
          console.log("Calculated Latency:", roundTripLatency);
          setLatency(roundTripLatency);
          setLatencyHistory(prevHistory => [...prevHistory, roundTripLatency]);
        } else {
          console.error("Timestamp is missing or invalid");
        }
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    };

    return () => {
      socket.close();  // Close the WebSocket connection on component unmount
    };
  }, []);

  return (
    <div className="wrapper">
      <h1>Pylon Latency</h1>
      <p>Packet Latency: {latency !== null ? `${latency} ms` : 'Waiting for packet...'}</p>
      <p>Average Latency: {calculateAverageLatency()} ms</p>
    </div>
  );
}

export default App;
