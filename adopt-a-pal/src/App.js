import logo from './logo.svg';
import HelloWorld from './HelloWorld';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://adopt-a-pal.wn.r.appspot.com//api/endpoint');
      const responseData = await response.json();
      setData(responseData);
    }
    fetchData();
  }, []);
  return (
    
    // <div className="App">
    //   <HelloWorld />
    // </div>
    <div className="App">
      <header className="App-header">
      <div>
        <HelloWorld />
      </div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
