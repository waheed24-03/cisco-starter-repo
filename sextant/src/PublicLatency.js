import React, { useEffect, useState } from 'react';

const PublicLatency = () => {
  const [latency, setLatency] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:55455');

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);  // Assuming the data is JSON
      const timestamp = data.timestamp;  // Extract timestamp
      const currentTime = Date.now();  // Current time in milliseconds
      const calculatedLatency = currentTime - timestamp;
      setLatency(calculatedLatency);
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="latency-container">
      <h2>Packet Latency</h2>
      {isConnected ? (
        <p>Latency: {latency ? `${latency} ms` : 'Waiting for packets...'}</p>
      ) : (
        <p>Connecting to Pylon...</p>
      )}
    </div>
  );
};

export default PublicLatency;
