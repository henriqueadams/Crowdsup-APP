import "./SearchResponse.screen.styles.css"
import { Header, Event } from "../../components/"
import { useEffect } from "react"
import { useEventsApi, useUserApi } from "../../../hooks"
import { useState } from "react"
import { useGlobalModal } from "../../../context"
import { useParams } from "react-router-dom"
export function SearchResponse() {
  const eventsApi = useEventsApi()
  const { search } = useParams()
  const [listaEventos, setListaEventos] = useState([])
  const [loggedUser, setLoggedUser] = useState()
  const userApi = useUserApi()
  const [globalModal] = useGlobalModal()
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
        console.log(error)
      }
    }
    fetchEvents()
  }, [eventsApi, globalModal, attEvents])

  console.log(listaEventos)

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
                <Event event={event} key={event.id} attEvents={setAttEvents} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
