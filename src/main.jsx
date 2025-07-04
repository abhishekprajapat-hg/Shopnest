import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './contexts/CartContext.jsx';
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
    <CartProvider>
    <App />
    <Toaster/>
x    </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);
