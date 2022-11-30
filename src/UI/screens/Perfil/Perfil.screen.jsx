import "./Perfil.screen.styles.css"
import { Header, Event, Spinner } from "../../components/"
import userImage from "../../../assets/img/user-default.png"
import editImage from "../../../assets/img/edit.png"
import { useGlobalModal } from "../../../context"
import { useState, useEffect, useCallback, useRef } from "react"
import { useParams } from "react-router-dom"
import { useUserApi, useEventsApi, useInfinityScroll } from "../../../hooks"
import { EditPerfilForm } from "./FormEdit.section"
export function Perfil() {
  const [globalModal, setGlobalModal] = useGlobalModal()
  const userApi = useUserApi()
  const eventsApi = useEventsApi()
  const { id } = useParams()
  const [userPerfil, setUserPerfil] = useState()
  const [eventsList, setEventsList] = useState([])
  const [attEvents, setAttEvents] = useState(false)
  const [userLogged, setUserLogged] = useState()
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoadingInfos, setLoadingInfos] = useState(true)

  const { hasMore, loading, error } = useInfinityScroll(
    eventsApi.listarEventosPerfil,
    pageNumber,
    setEventsList,
    setPageNumber,
    [globalModal, attEvents, id],
    [id, userLogged]
  )

  useEffect(() => {
    async function fetchUsuarioLogado() {
      const response = await userApi.detalhar()
      setUserLogged(response)
      setLoadingInfos(false)
    }
    fetchUsuarioLogado()
  }, [id, userApi])

  useEffect(() => {
    async function fetchUsuario() {
      const response = await userApi.listarPerfil(id)
      setUserPerfil(response)
    }
    fetchUsuario()
  }, [id, userApi, globalModal])

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

  return (
    <div className="background default-background-color">
      <Header userLogged={userLogged} />
      <div className="padding-header ">
        {isLoadingInfos ? (
          <Spinner className={"page-spinner"} />
        ) : (
          <div className="default-container">
            <div className="header-perfil">
              <div className="header-perfil-user">
                <img
                  className="header-perfil-user-image"
                  src={userPerfil?.fotoPerfil || userImage}
                  alt="imagem do usuario"
                />
                <div className="header-perfil-user-infos">
                  <div className="div-inline-text-image">
                    <h1 className="title-name">{userPerfil?.nome}</h1>
                    {parseInt(userLogged?.id) === parseInt(id) && (
                      <img
                        src={editImage}
                        alt="lapis"
                        className="edit-image"
                        onClick={() =>
                          setGlobalModal((currentValue) => ({
                            ...currentValue,
                            showModal: true,
                            content: EditPerfilForm,
                          }))
                        }
                      />
                    )}
                  </div>
                  <h4 className="low-text-perfil user-city">
                    {userPerfil?.cidade}
                  </h4>
                </div>
              </div>
              <div className="header-perfil-contact">
                <h2 className="medium-text-perfil">Contato</h2>
                <h4 className="low-text-perfil">{userPerfil?.email}</h4>
                <h4 className="low-text-perfil">{userPerfil?.telefone}</h4>
              </div>
            </div>
            <h2 className="event-title-perfil medium-text-perfil">
              {eventsList.length
                ? "Ações que estou participando"
                : "Ainda não estou participando de nenhum evento"}
            </h2>
            <div className="div-events">
              {eventsList.map((event, index) => {
                if (eventsList.length === index + 1) {
                  return (
                    <Event
                      innerRef={lastElementRef}
                      event={event}
                      key={event.id}
                      attEvents={setAttEvents}
                      userLogged={userLogged}
                    />
                  )
                }
                return (
                  <Event
                    event={event}
                    key={index}
                    attEvents={setAttEvents}
                    userLogged={userLogged}
                  />
                )
              })}
            </div>
            <div className="div-loading-scroll">
              {loading && <Spinner className={"page-spinner"} />}
              {error && <p>Ocorreu um erro</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
