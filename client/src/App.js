import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [trackingNumber, setTrackingNumber] = useState('BPS1EP58YI5SKBR');
  const [packageData, setPackageData] = useState({});
  const [jwt, setJWT] = useState('');
  const [lastClicked, setLastClicked] = useState(null);

  // Bearer token to be used with the request for the tracking information
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.'+
                'eyJpYXQiOjE2NzIzMjY1NTUsImV4cCI6MTcwMzg2M'+
                'jU1NSwiYXVkIjoiaHR0cHM6Ly9icmluZ2VycGFyY2'+
                'VsLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjo'+
                'iNTI1eXM2YWh4d3UyIiwianRpIjoiZDdlZGE3NDgt'+
                'NzMxOS00YWIzLWI2MGEtMDEzMzI0NmVkNmY2In0.u'+
                'Ji6d6-E2zDWj24wryh2sVWKs4ceny4QllbrHrzK5L0';

  const handleClick = () => {
    // Fetch the tracking data based on the given tracking number.
    fetch(`/api/tracking?tracking_number=${trackingNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setPackageData(data))
      .catch(error => console.error(error));
    setLastClicked('package');
  };
  

  const handleRandomClick = async () => {
    try {
      // Generate a random JWT token and set it in the 
      // component's state.
      const res = await fetch('/api');
      const data = await res.json();
      setJWT(data.token);
    } catch (error) {
      console.error(error);
    }
    setLastClicked('jwt');
  };

  return (
    <div className="container">
      <img src={require('./Logo.png')}/>
      <button onClick={handleRandomClick}> Generate JWT </button>
      <input
        type="text"
        value={trackingNumber}
        onChange={event => setTrackingNumber(event.target.value)}/>
      <button onClick={handleClick}> Track Package </button>
      <div className="container">
        {lastClicked === 'package' && packageData && (
          <pre> {JSON.stringify(packageData, null, 2)} </pre>
        )}
        {lastClicked === 'jwt' && jwt && (
          <pre> {jwt} </pre>
        )}
      </div>
    </div>
  );
  
};

export default App;
