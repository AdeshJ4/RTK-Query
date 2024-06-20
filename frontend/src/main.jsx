import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { router } from './App.jsx'
import { RouterProvider } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
);