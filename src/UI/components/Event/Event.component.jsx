import "./Event.component.styles.css"
import calendarIcon from "../../../assets/img/calendar.png"
import userIcon from "../../../assets/img/user.png"

export function Event({ event }) {
  const { user, date, title, description, city, adreess, isJoined } = event

  function renderButton() {
    const isExpired = Date.now() > new Date(date).getTime()
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
          <img src={user.imgProfile} alt="user" />
          <h4 className="title-large-bold event-user-name">{user.name}</h4>
        </div>
        <div className="div-event-row">
          <p className="title-large-thin">
            <strong className="title-large-bold">Data do evento: </strong>{" "}
            {`${new Date(date).getDate()}/${
              new Date(date).getMonth() + 1
            }/${new Date(date).getFullYear()}`}
          </p>
          <img className="image-margin" src={calendarIcon} alt="calendar" />
        </div>
      </div>
      <div className="div-event-content">
        <h3 className="title-large-bold event-title">{title}</h3>
        <p className="title-medium">{description}</p>
      </div>
      <div className="div-event-row">
        <div>
          <p className="title-medium">
            <strong className="adreess-title">Cidade:</strong>
            {city}
          </p>
          <p className="title-medium">
            <strong className="adreess-title">Endereço:</strong>
            {adreess}
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
