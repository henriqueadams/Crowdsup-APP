import { API_ROUTE } from "../../../constants/routes"
import { useHttp } from "../base/UseHttp.hook"
import { useMemo } from "react"
export function useUserApi() {
  const httpInstance = useHttp(API_ROUTE)

  async function registrar(registerValues) {
    const response = await httpInstance.post("/cadastro", registerValues)
    return response
  }

  async function login(loginValues) {
    const response = await httpInstance.post("/login", loginValues)
    return response
  }

  return useMemo(
    () => ({
      registrar,
      login,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}
