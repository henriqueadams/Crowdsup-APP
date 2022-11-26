import "./FormEvent.styles.css"
import { FormField } from "../../components"
import { useState } from "react"
import { useEventsApi } from "../../../hooks"
import { useGlobalToast, useGlobalModal } from "../../../context"
import { TOAST_MESSAGES } from "../../../constants/toast-messages"
export function AddEventForm() {
  const eventsApi = useEventsApi()
  const [, setGlobalToast] = useGlobalToast()
  const [, setGlobalModal] = useGlobalModal()
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

  function handleChange(event) {
    const { name, value, type } = event.target
    if (type === "number") {
      return setFormData((currentValue) => ({
        ...currentValue,
        [name]: parseInt(value),
      }))
    }
    return setFormData((currentValue) => ({ ...currentValue, [name]: value }))
  }

  function handleChangeEndereco(event) {
    const { name, value } = event.target
    setFormData((currentValue) => ({
      ...currentValue,
      Endereco: { ...currentValue["Endereco"], [name]: value },
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      await eventsApi.criarEvento(formData)
      setGlobalModal((currentValue) => ({ ...currentValue, showModal: false }))
      setGlobalToast((currentValue) => ({
        ...currentValue,
        showToast: true,
        content: TOAST_MESSAGES.EVENT_REGISTER_SUCCESS,
      }))
    } catch (error) {
      setGlobalToast((currentValue) => ({
        ...currentValue,
        showToast: true,
        content: TOAST_MESSAGES.EVENT_REGISTER_ERROR,
      }))
    }
  }

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
          value={formData.Endereco.Cidade}
        />
        <FormField
          label="Estado"
          name="Estado"
          type="text"
          onChange={handleChangeEndereco}
          isHalf
          value={formData.Endereco.Estado}
        />
        <FormField
          label="Rua"
          name="Rua"
          type="text"
          onChange={handleChangeEndereco}
          value={formData.Endereco.Rua}
        />
        <FormField
          label="Bairro"
          name="Bairro"
          type="text"
          onChange={handleChangeEndereco}
          isHalf
          value={formData.Endereco.Bairro}
        />

        <FormField
          label="Numero"
          name="Numero"
          type="number"
          onChange={handleChangeEndereco}
          isHalf
          value={formData.Endereco.Numero}
        />
        <FormField
          label="Qtd. de Volutários"
          name="QuantidadeVoluntariosNecessarios"
          type="number"
          onChange={handleChange}
          value={formData.QuantidadeVoluntariosNecessarios}
          isHalf
        />
        <FormField
          label="Data do evento"
          name="DataEvento"
          type="date"
          onChange={handleChange}
          value={formData.DataEvento}
          isHalf
        />
        <FormField
          label="Titulo"
          name="Titulo"
          type="text"
          onChange={handleChange}
          value={formData.Titulo}
        />
        <FormField
          label="Descricao"
          name="Descricao"
          type="text"
          isTextArea
          onChange={handleChange}
          value={formData.Descricao}
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
