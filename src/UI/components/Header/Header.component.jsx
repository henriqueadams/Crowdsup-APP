import "./Header.component.styles.css"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { HOME_ROUTE, PERFIL_ROUTE } from "../../../constants/routes"
import { Modal, SearchBar } from "../../components"
import { useGlobalModal } from "../../../context"
import { AddEventForm } from "./FormEvent.section"
import defaultUserImage from "../../../assets/img/user-default.png"
import { useUserApi } from "../../../hooks"
import { useEffectOnce } from "usehooks-ts"

export function Header({ userLogged }) {
  const [, setGlobalModal] = useGlobalModal()
  const [dropdown, setDropDown] = useState()
  const navigate = useNavigate()
  const userApi = useUserApi()
  const [isOnBreakpoint, setIsOnBreakpoint] = useState(false)

  useEffectOnce(() => {
    changeBreackpoint()
  })

  function changeBreackpoint() {
    if (window.screen.width < 768) {
      setIsOnBreakpoint(true)
    } else {
      setIsOnBreakpoint(false)
    }
  }

  window.addEventListener("resize", changeBreackpoint)

  return (
    <div className="div-header">
      <Modal />
      <div className="container-header div-header-content">
        <h1 className="logo-header" onClick={() => navigate(HOME_ROUTE)}>
          Crowdsup
        </h1>
        {!isOnBreakpoint && <SearchBar />}
        <div className="div-menu">
          <div onClick={() => setDropDown(!dropdown)} className="user-image">
            <img
              src={userLogged?.fotoPerfil || defaultUserImage}
              alt="foto de perfil"
            />
          </div>
          {dropdown && (
            <ul className="dropdown">
              <li>
                <NavLink to={PERFIL_ROUTE(userLogged?.id)}>Meu perfil</NavLink>
              </li>
              <li
                onClick={() =>
                  setGlobalModal((currentValue) => ({
                    ...currentValue,
                    showModal: true,
                    content: AddEventForm,
                  }))
                }
              >
                Adicionar Evento
              </li>
              <li onClick={() => userApi.logout()}>Logout</li>
            </ul>
          )}
        </div>
      </div>
      {isOnBreakpoint && <SearchBar />}
    </div>
  )
}
