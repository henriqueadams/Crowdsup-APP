import { Routes, Route } from "react-router-dom"
import { Login, Register, Home, Perfil, SearchResponse } from "./UI/screens"
import { Toast } from "./UI/components"
import { Navigate } from "react-router-dom"
import "./assets/styles/base/reset.css"
import "./assets/styles/base/variables.css"
import "./assets/styles/global/global.css"
import { useGlobalUser } from "./context"

const PrivateRoute = ({ children }) => {
  const [user] = useGlobalUser()
  if (user.length) {
    return <>{children}</>
  }
  return <Navigate to="/" />
}

function App() {
  return (
    <>
      <Toast />
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
          path="/perfil/:id"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/pesquisa/:search"
          element={
            <PrivateRoute>
              <SearchResponse />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
