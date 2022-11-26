import "./Event.component.styles.css"
import calendarIcon from "../../../assets/img/calendar.png"
import userIcon from "../../../assets/img/user.png"
import defaultUserImage from "../../../assets/img/user-default.png"
import { useEventsApi } from "../../../hooks"
import { useGlobalToast } from "../../../context"
import { TOAST_MESSAGES } from "../../../constants/toast-messages"
import { useNavigate } from "react-router-dom"
import { PERFIL_ROUTE } from "../../../constants/routes"
export function Event({ event, attEvents }) {
  const {
    id,
    organizador,
    dataEvento,
    titulo,
    descricao,
    endereco,
    quantidadeParticipantes,
    quantidadeVoluntariosNecessarios,
    isJoined,
  } = event
  const navigate = useNavigate()
  const eventsApi = useEventsApi()
  const [, setGlobalToast] = useGlobalToast()

  async function handleJoin() {
    try {
      await eventsApi.entrarEvento(id)
      setGlobalToast((currentValue) => ({
        ...currentValue,
        showToast: true,
        content: TOAST_MESSAGES.EVENT_JOIN_SUCCESS,
      }))
      attEvents((currentValue) => !currentValue)
    } catch (error) {
      setGlobalToast((currentValue) => ({
        ...currentValue,
        showToast: true,
        content: TOAST_MESSAGES.EVENT_JOIN_ERROR,
      }))
    }
  }

  async function handleCancel() {
    try {
      await eventsApi.sairEvento({ EventoId: id })
      setGlobalToast((currentValue) => ({
        ...currentValue,
        showToast: true,
        content: TOAST_MESSAGES.EVENT_CANCEL_SUCCESS,
      }))
      attEvents((currentValue) => !currentValue)
    } catch (error) {
      setGlobalToast((currentValue) => ({
        ...currentValue,
        showToast: true,
        content: TOAST_MESSAGES.EVENT_CANCEL_ERROR,
      }))
    }
  }

  function renderButton() {
    const isExpired = Date.now() > new Date(dataEvento).getTime()
    if (isExpired) {
      return (
        <button disabled className="button-expired button-medium button-event">
          Expirado
        </button>
      )
    }
    if (isJoined) {
      return (
        <button
          onClick={handleCancel}
          className="button-secondary button-medium button-event"
        >
          Cancelar
        </button>
      )
    }
    if (quantidadeParticipantes === quantidadeVoluntariosNecessarios) {
      return (
        <button disabled className="button-expired button-medium button-event">
          Cheio
        </button>
      )
    } else {
      return (
        <button
          onClick={handleJoin}
          className="button-primary button-medium button-event"
        >
          Juntar-se
        </button>
      )
    }
  }

  return (
    <div className="div-event">
      <div className="div-event-row">
        <div
          className="div-event-row"
          onClick={() => navigate(PERFIL_ROUTE(organizador.id))}
        >
          <img src={organizador.imagemPerfil || defaultUserImage} alt="user" />
          <h4 className="title-large-bold event-user-name">
            {organizador.nome}
          </h4>
        </div>
        <div className="div-event-row">
          <p className="title-large-thin">
            <strong className="title-large-bold">Data do evento: </strong>{" "}
            {`${new Date(dataEvento).getDate()}/${
              new Date(dataEvento).getMonth() + 1
            }/${new Date(dataEvento).getFullYear()}`}
          </p>
          <img className="image-margin" src={calendarIcon} alt="calendar" />
        </div>
      </div>
      <div className="div-event-content">
        <h3 className="title-large-bold event-title">{titulo}</h3>
        <p className="title-medium">{descricao}</p>
      </div>
      <div className="div-event-row">
        <div>
          <p className="title-medium">
            <strong className="adreess-title">Cidade:</strong>
            {`${endereco.cidade} - ${endereco.estado}`}
          </p>
          <p className="title-medium">
            <strong className="adreess-title">Endereço:</strong>
            {`${endereco.rua}, ${endereco.numero} - ${endereco.bairro}`}
          </p>
        </div>
        <div className="div-event-row">
          <div className="div-event-row">
            <p className="title-large-thin">{`${quantidadeParticipantes} / ${quantidadeVoluntariosNecessarios}`}</p>
            <img className="image-margin" src={userIcon} alt="user-icon" />
          </div>
          {renderButton()}
        </div>
      </div>
    </div>
  )
}
