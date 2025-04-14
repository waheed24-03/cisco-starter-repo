// src/PublicIP.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function PublicIP({ type }) {
  const [ip, setIp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = type === "v4" ? "https://api.ipify.org?format=json" : "https://api6.ipify.org?format=json";
    
    axios
      .get(url)
      .then((response) => {
        setIp(response.data.ip);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching IP address");
        setLoading(false);
      });
  }, [type]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h3>{type === "v4" ? "IPv4 Address" : "IPv6 Address"}</h3>
      <p>{ip}</p>
    </div>
  );
}

export default PublicIP;
