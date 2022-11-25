import "./Event.component.styles.css"
import calendarIcon from "../../../assets/img/calendar.png"
import userIcon from "../../../assets/img/user.png"
import defaultUserImage from "../../../assets/img/user-default.png"

export function Event({ event }) {
  const { organizador, dataEvento, titulo, descricao, endereco, isJoined } =
    event

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
        <button className="button-secondary button-medium button-event">
          Cancelar
        </button>
      )
    } else {
      return (
        <button className="button-primary button-medium button-event">
          Juntar-se
        </button>
      )
    }
  }

  return (
    <div className="div-event">
      <div className="div-event-row">
        <div className="div-event-row">
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
            <p className="title-large-thin">2/5</p>
            <img className="image-margin" src={userIcon} alt="user-icon" />
          </div>
          {renderButton()}
        </div>
      </div>
    </div>
  )
}
