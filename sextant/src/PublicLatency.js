// sextant/src/PublicLatency.js
import React, { useState, useEffect } from 'react';

const PublicLatency = () => {
  const [latency, setLatency] = useState(null);
  
  useEffect(() => {
    // Create a WebSocket connection to the server
    const socket = new WebSocket('ws://localhost:55455');

    socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
      // The incoming message is expected to have a 'data' field containing a timestamp
      const packetTimestamp = JSON.parse(event.data).timestamp;
      
      // Calculate the latency by subtracting the timestamp from the current time
      const latency = Date.now() - packetTimestamp;

      setLatency(latency); // Update the state with the new latency
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="latency-container">
      <h2>Packet Latency</h2>
      {latency !== null ? (
        <p>Latency: {latency} ms</p>
      ) : (
        <p>Waiting for packet...</p>
      )}
    </div>
  );
};

export default PublicLatency;
