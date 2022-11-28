import "./SearchResponse.screen.styles.css"
import { Header, Event } from "../../components/"
import { useEffect } from "react"
import { useEventsApi, useUserApi } from "../../../hooks"
import { useState } from "react"
import { useGlobalModal, useGlobalToast } from "../../../context"
import { useParams } from "react-router-dom"
import { TOAST_MESSAGES } from "../../../constants/toast-messages"
export function SearchResponse() {
  const eventsApi = useEventsApi()
  const { search } = useParams()
  const [listaEventos, setListaEventos] = useState([])
  const [loggedUser, setLoggedUser] = useState()
  const userApi = useUserApi()
  const [globalModal] = useGlobalModal()
  const [, setGlobalToast] = useGlobalToast()
  const [attEvents, setAttEvents] = useState(false)

  useEffect(() => {
    async function fetchDetailUser() {
      const response = await userApi.detalhar()
      setLoggedUser(response)
    }
    fetchDetailUser()
  }, [userApi])

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await eventsApi.listarEventosPesquisa(search)
        setListaEventos(response.eventos)
      } catch (error) {
        setGlobalToast((currentValue) => ({
          ...currentValue,
          showToast: true,
          content: TOAST_MESSAGES.DEFAULT_ERROR,
        }))
      }
    }
    fetchEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsApi, globalModal, attEvents])

  return (
    <div className="background default-background-color">
      <Header userLogged={loggedUser} />
      <div className="padding-header ">
        <div className="default-container">
          <h2 className="home-title">
            {listaEventos.length
              ? "Ações Sociais encontradas para: " + search
              : "Não encontramos nenhum evento para " + search}
          </h2>
          <div className="div-events">
            {listaEventos.map((event) => {
              return (
                <Event
                  event={event}
                  key={event.id}
                  attEvents={setAttEvents}
                  userLogged={loggedUser}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
