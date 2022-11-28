import { API_ROUTE, LOGIN_ROUTE } from "../../../constants/routes"
import { useHttp } from "../base/UseHttp.hook"
import { useMemo } from "react"
import { useGlobalUser } from "../../../context"
import { useNavigate } from "react-router-dom"
export function useUserApi() {
  const httpInstance = useHttp(API_ROUTE)
  const navigate = useNavigate()
  const [, setGlobalUser] = useGlobalUser()

  async function registrar(registerValues) {
    const response = await httpInstance.post("/cadastro", registerValues)
    return response
  }

  async function login(loginValues) {
    const response = await httpInstance.post("/login", loginValues)
    return response
  }

  async function logout() {
    setGlobalUser({})
    navigate(LOGIN_ROUTE)
  }

  async function detalhar() {
    const response = await httpInstance.get("/usuarios")
    return response
  }

  async function editar(editValues) {
    const response = await httpInstance.put("/usuarios", editValues)
    return response
  }

  async function listarPerfil(usuarioId) {
    const response = await httpInstance.get(`/usuarios/perfil?id=${usuarioId}`)
    return response
  }

  return useMemo(
    () => ({
      registrar,
      login,
      detalhar,
      listarPerfil,
      logout,
      editar,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}
