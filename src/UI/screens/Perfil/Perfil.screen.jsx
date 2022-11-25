import "./Perfil.screen.styles.css"

import { Header, Event, FormField } from "../../components/"
import userImage from "../../../assets/img/user-default.png"
import editImage from "../../../assets/img/edit.png"
import { EVENTS } from "../../../constants/events"
import { useGlobalModal } from "../../../context"
import { useState } from "react"
export function Perfil() {
  const [, setGlobalModal] = useGlobalModal()
  const user = {
    img: userImage,
    nome: "Jorge Wagner",
    cidade: "Rolante - RS",
    email: "exemplo@faccat.com",
    telefone: "(51) 99999-9999",
  }

  function EditPerfilForm() {
    // eslint-disable-next-line no-unused-vars
    const [formData, setFormData] = useState({
      Estado: "",
      Cidade: "",
      Telefone: "",
    })
    function handleChange(event) {
      const { name, value } = event.target
      setFormData((currentValue) => ({ ...currentValue, [name]: value }))
    }
    function handleSubmit() {}

    return (
      <div className="form-edit-modal-wrapper">
        <h2 className="form-edit-title">Editar perfil</h2>
        <form className="form-edit">
          <FormField
            label="Cidade"
            name="Cidade"
            type="text"
            onChange={handleChange}
          />
          <FormField
            label="Estado"
            name="Estado"
            type="text"
            onChange={handleChange}
          />
          <FormField
            label="Telefone"
            name="Telefone"
            type="text"
            onChange={handleChange}
          />
        </form>
        <button
          onClick={(event) => handleSubmit(event)}
          className="button-medium button-primary button-modal"
          type="submit"
        >
          Registrar
        </button>
      </div>
    )
  }

  return (
    <div className="background default-background-color">
      <Header />
      <div className="padding-header ">
        <div className="default-container">
          <div className="header-perfil">
            <div className="header-perfil-user">
              <img
                className="header-perfil-user-image"
                src={user.img}
                alt="imagem do usuario"
              />
              <div className="header-perfil-user-infos">
                <div className="div-inline-text-image">
                  <h1 className="title-name">{user.nome}</h1>
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
                </div>

                <h4 className="low-text-perfil">{user.cidade}</h4>
              </div>
            </div>
            <div className="header-perfil-contact">
              <h2 className="medium-text-perfil">Contato</h2>
              <h4 className="low-text-perfil">{user.email}</h4>
              <h4 className="low-text-perfil">{user.telefone}</h4>
            </div>
          </div>
          <h2 className="event-title-perfil medium-text-perfil">
            Ações que estou participando
          </h2>
          <div className="div-events">
            {EVENTS.map((event, index) => {
              return <Event event={event} key={index} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
