import { Routes, Route } from "react-router-dom"
import { Login, Register, Home, Perfil } from "./UI/screens"
import { Navigate } from "react-router-dom"
import "./assets/styles/base/reset.css"
import "./assets/styles/base/variables.css"
import "./assets/styles/global/global.css"
import { useGlobalUser } from "./context"

const PrivateRoute = ({ children }) => {
  const [user] = useGlobalUser()
  //user.lenght
  if (user) {
    return <>{children}</>
  }
  return <Navigate to="/" />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default App
