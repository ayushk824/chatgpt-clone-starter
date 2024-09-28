import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {  createBrowserRouter, RouterProvider , } from "react-router-dom";


import Dashboard from './routes/Dashboardpage/Dashboard';
import Homepage from './routes/Homepage/homepage';
import Chatpage from './routes/chatPage/chatpage';
import Rootlayout from './Layout/rootlayout/Rootlayout';
import Dashboardlayout from './Layout/Dashboardlayout/Dashboardlayout';

import SignUpPage from './routes/signUpPage/SignUpPage';
import SignInPage from './routes/signInPage/SignInPage';







const router = createBrowserRouter([
 {
  element : <Rootlayout/>,
  children:[
    {
      path: "/",
      element: <Homepage/>
    },
    {
      path: "/sign-in/*",
      element: <SignInPage/>
    },
    {
      path: "/sign-Up/*",
      element: <SignUpPage/>
    },
    {
      element : <Dashboardlayout/>,
      children : [
        {
          path : "/dashboard",
          element : <Dashboard/>
        },
        {
          path:"/dashboard/chats/:id",
          element : <Chatpage/>
        }

      ]
    }
 ]
 }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
