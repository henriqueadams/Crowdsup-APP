import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import {
  UserGlobalProvider,
  ModalGlobalProvider,
  ToastGlobalProvider,
} from "./context"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <BrowserRouter>
    <UserGlobalProvider>
      <ModalGlobalProvider>
        <ToastGlobalProvider>
          <App />
        </ToastGlobalProvider>
      </ModalGlobalProvider>
    </UserGlobalProvider>
  </BrowserRouter>
)
