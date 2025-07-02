import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from './context/UserContext';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </UserProvider>
)
