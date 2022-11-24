import { SearchBar } from "../SearchBar/SearchBar.component"
import "./Header.component.styles.css"
import "./FormEvent.styles.css"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { HOME_ROUTE, PERFIL_ROUTE } from "../../../constants/routes"
import { Modal, FormField } from "../../components"
import { useGlobalModal } from "../../../context"
export function Header() {
  const [, setGlobalModal] = useGlobalModal()
  const [dropdown, setDropDown] = useState()
  const navigate = useNavigate()

  function AddEventForm() {
    const [formData, setFormData] = useState({
      Titulo: "",
      Descricao: "",
      Endereco: {
        Estado: "",
        Cidade: "",
        Bairro: "",
        Rua: "",
        Numero: "",
      },
      DataEvento: "",
      QuantidadeVoluntariosNecessarios: "",
    })
    console.log(formData)
    function handleChange(event) {
      const { name, value } = event.target
      setFormData((currentValue) => ({ ...currentValue, [name]: value }))
    }
    function handleChangeEndereco(event) {
      const { name, value } = event.target
      setFormData((currentValue) => ({
        ...currentValue,
        ["Endereco"]: { ...currentValue["Endereco"], [name]: value },
      }))
    }
    function handleSubmit() {}

    return (
      <div className="form-event-modal-wrapper">
        <h2 className="form-modal-title">Divulgar evento</h2>
        <form className="form-event">
          <FormField
            label="Cidade"
            name="Cidade"
            type="text"
            onChange={handleChangeEndereco}
            isHalf
          />
          <FormField
            label="Estado"
            name="Estado"
            type="text"
            onChange={handleChangeEndereco}
            isHalf
          />
          <FormField
            label="Rua"
            name="Rua"
            type="text"
            onChange={handleChangeEndereco}
          />
          <FormField
            label="Bairro"
            name="Bairro"
            type="text"
            onChange={handleChangeEndereco}
            isHalf
          />

          <FormField
            label="Numero"
            name="Numero"
            type="number"
            onChange={handleChangeEndereco}
            isHalf
          />
          <FormField
            label="Qtd. de Volutários"
            name="QuantidadeVoluntariosNecessarios"
            type="number"
            onChange={handleChange}
            isHalf
          />
          <FormField
            label="Data do evento"
            name="DataEvento"
            type="date"
            onChange={handleChange}
            isHalf
          />
          <FormField
            label="Titulo"
            name="Titulo"
            type="text"
            onChange={handleChange}
          />
          <FormField
            label="Descricao"
            name="Descricao"
            type="text"
            isTextArea
            onChange={handleChange}
          />
        </form>
        <button
          onClick={(event) => handleSubmit(event)}
          className="button-medium button-primary button-modal"
          type="submit"
        >
          Divulgar
        </button>
      </div>
    )
  }

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
