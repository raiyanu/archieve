import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import {
  BrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error from './components/Error'
ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider>
        <main className="dark text-foreground bg-background">
          <App />
        </main>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
