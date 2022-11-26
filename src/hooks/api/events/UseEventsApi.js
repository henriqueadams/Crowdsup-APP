import { useMemo } from "react"
import { API_ROUTE } from "../../../constants/routes"
import { useHttp } from "../base/UseHttp.hook"

export function useEventsApi() {
  const httpInstance = useHttp(API_ROUTE)

  async function listarEventos() {
    const response = await httpInstance.get("/eventos?Pagina=1")
    return response
  }

  async function listarEventosPesquisa(search) {
    const response = await httpInstance.get(
      `/eventos/pesquisar?Pagina=1&Cidade=${search}`
    )
    return response
  }

  async function criarEvento(event) {
    const response = await httpInstance.post("/eventos", event)
    return response
  }

  async function entrarEvento(eventId) {
    const response = await httpInstance.post(
      `/eventos/join?EventoId=${eventId}`
    )
    return response
  }

  async function sairEvento(eventId) {
    const response = await httpInstance.put(`/eventos/cancelar`, eventId)
    return response
  }

  return useMemo(
    () => ({
      listarEventos,
      criarEvento,
      entrarEvento,
      sairEvento,
      listarEventosPesquisa,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}
