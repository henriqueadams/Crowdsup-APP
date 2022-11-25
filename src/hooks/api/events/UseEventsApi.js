import { useMemo } from "react"
import { API_ROUTE } from "../../../constants/routes"
import { useHttp } from "../base/UseHttp.hook"

export function useEventsApi() {
  const httpInstance = useHttp(API_ROUTE)

  async function listarEventos() {
    const response = await httpInstance.get("/eventos?Pagina=1")
    return response
  }

  async function criarEvento(event) {
    const response = await httpInstance.post("/eventos", event)
    return response
  }

  return useMemo(
    () => ({
      listarEventos,
      criarEvento,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}
