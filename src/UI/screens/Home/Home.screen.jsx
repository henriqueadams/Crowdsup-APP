import { Header, Event } from "../../components/"
import "./Home.screen.styles.css"
import { useEffect } from "react"
import { useEventsApi } from "../../../hooks"
import { useState } from "react"
export function Home() {
  const CIDADE = "Rolante"
  const eventsApi = useEventsApi()
  const [listaEventos, setListaEventos] = useState([])

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
  }, [eventsApi])

  return (
    <div className="background default-background-color">
      <Header />
      <div className="padding-header ">
        <div className="default-container">
          <h2 className="home-title">{"Ações Sociais em " + CIDADE} </h2>
          <div className="div-events">
            {listaEventos.map((event, index) => {
              return <Event event={event} key={index} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
