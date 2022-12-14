import { Header, Event, Spinner } from "../../components/"
import "./Home.screen.styles.css"
import { useEffect } from "react"
import { useEventsApi, useUserApi, useInfinityScroll } from "../../../hooks"
import { useState, useCallback, useRef } from "react"
import { useGlobalModal } from "../../../context"
export function Home() {
  const eventsApi = useEventsApi()
  const [listaEventos, setListaEventos] = useState([])
  const [loggedUser, setLoggedUser] = useState()
  const userApi = useUserApi()
  const [globalModal] = useGlobalModal()
  const [attEvents, setAttEvents] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoadingInfos, setLoadingInfos] = useState(true)

  const { hasMore, loading, error } = useInfinityScroll(
    eventsApi.listarEventos,
    pageNumber,
    setListaEventos,
    setPageNumber,
    [globalModal, attEvents]
  )

  const observer = useRef()
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  useEffect(() => {
    async function fetchDetailUser() {
      const response = await userApi.detalhar()
      setLoggedUser(response)
      setLoadingInfos(false)
    }
    fetchDetailUser()
  }, [userApi])

  return (
    <div className="background default-background-color">
      <Header userLogged={loggedUser} />
      <div className="padding-header ">
        {isLoadingInfos ? (
          <Spinner className={"page-spinner"} />
        ) : (
          <>
            <div className="default-container">
              <h2 className="home-title">
                {listaEventos.length
                  ? "Ações Sociais em " + loggedUser?.cidade
                  : "Não encontramos ações sociais em " + loggedUser?.cidade}
              </h2>
              <div className="div-events">
                {listaEventos.map((event, index) => {
                  if (listaEventos.length === index + 1) {
                    return (
                      <Event
                        innerRef={lastElementRef}
                        event={event}
                        key={event.id}
                        attEvents={setAttEvents}
                        userLogged={loggedUser}
                      />
                    )
                  }
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
              <div className="div-loading-scroll">
                {loading && <Spinner className={"page-spinner"} />}
                {error && <p>Ocorreu um erro</p>}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
