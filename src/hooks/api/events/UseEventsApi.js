import { useMemo } from "react"
import { API_ROUTE } from "../../../constants/routes"
import { useHttp } from "../base/UseHttp.hook"

export function useEventsApi() {
  const httpInstance = useHttp(API_ROUTE)

  async function listarEventos(page) {
    const response = await httpInstance.get(`/eventos?Pagina=${page}`)
    return response
  }

  async function listarEventosPerfil(page, usuarioId) {
    const response = await httpInstance.get(
      `/eventos/perfil?Pagina=${page}&UsuarioId=${usuarioId}`
    )
    return response
  }

  async function listarEventosPesquisa(page, search) {
    const response = await httpInstance.get(
      `/eventos/pesquisar?Pagina=${page}&Cidade=${search}`
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
      listarEventosPerfil,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}
