import { SearchBar } from "../SearchBar/SearchBar.component"
import "./Header.component.styles.css"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { HOME_ROUTE, PERFIL_ROUTE } from "../../../constants/routes"
import { Modal } from "../../components"
import { useGlobalModal } from "../../../context"
import { AddEventForm } from "./FormEvent.section"
export function Header() {
  const [, setGlobalModal] = useGlobalModal()
  const [dropdown, setDropDown] = useState()
  const navigate = useNavigate()

  return (
    <div className="div-header">
      <Modal />
      <div className="container-header div-header-content">
        <h1 className="logo-header" onClick={() => navigate(HOME_ROUTE)}>
          Crowdsup
        </h1>
        <SearchBar />
        <div className="div-menu">
          <div onClick={() => setDropDown(!dropdown)} className="user-image" />
          {dropdown && (
            <ul className="dropdown">
              <li>
                <NavLink to={PERFIL_ROUTE}>Meu perfil</NavLink>
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
              <li>Logout</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
