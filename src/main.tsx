import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './context/UserContext';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

