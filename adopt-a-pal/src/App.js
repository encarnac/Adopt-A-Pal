// import HelloWorld from './HelloWorld';

import Landing from './routes/landing/landing';
// import Login from './routes/login/login';
// import Signup from './routes/signup';
import dashboard from './routes/dashboard/dashboard';
import './App.css';
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import get_user_pals from './modules/get_user_pals';

function App() {
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('https://adopt-a-pal.wn.r.appspot.com//api/endpoint');
  //     const responseData = await response.json();
  //     setData(responseData);
  //   }
  //   fetchData();
  // }, []);

  // Creates routes to display different screens
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      
    }
  ]);

  const uid = 5677459739508736

  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
    
  );
}

export default App;
