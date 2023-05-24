// import HelloWorld from './HelloWorld';
import './App.css';
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from './routes/landing/landing';
import Dashboard from './routes/dashboard/dashboard';
import Browse from './routes/browse/browse';
import get_user_pals from './modules/UseUserPals';

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
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={router} />
      </header>
    </div>
    
  );
}

export default App;
