import "./Perfil.screen.styles.css"
import { Header, Event } from "../../components/"
import userImage from "../../../assets/img/user-default.png"
import editImage from "../../../assets/img/edit.png"
import { useGlobalModal } from "../../../context"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useUserApi, useEventsApi } from "../../../hooks"
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

  useEffect(() => {
    async function fetchUsuarioLogado() {
      const response = await userApi.detalhar()
      setUserLogged(response)
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

  useEffect(() => {
    async function fetchEvent() {
      const response = await eventsApi.listarEventosPerfil(id)
      setEventsList(response.eventos)
    }
    fetchEvent()
  }, [eventsApi, id, attEvents, globalModal])

  return (
    <div className="background default-background-color">
      <Header userLogged={userLogged} />
      <div className="padding-header ">
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
                <h4 className="low-text-perfil">{userPerfil?.cidade}</h4>
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
        </div>
      </div>
    </div>
  )
}
