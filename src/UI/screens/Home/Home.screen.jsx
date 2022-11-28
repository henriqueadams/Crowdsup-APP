import { Header, Event } from "../../components/"
import "./Home.screen.styles.css"
import { useEffect } from "react"
import { useEventsApi, useUserApi } from "../../../hooks"
import { useState } from "react"
import { useGlobalModal } from "../../../context"
export function Home() {
  const eventsApi = useEventsApi()
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
        const response = await eventsApi.listarEventos()
        setListaEventos(response.eventos)
      } catch (error) {
        console.log(error)
      }
    }
    fetchEvents()
  }, [eventsApi, globalModal, attEvents])

  return (
    <div className="background default-background-color">
      <Header userLogged={loggedUser} />
      <div className="padding-header ">
        <div className="default-container">
          <h2 className="home-title">
            {listaEventos.length
              ? "Ações Sociais em " + loggedUser?.cidade
              : "Não encontramos ações sociais em " + loggedUser?.cidade}
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
