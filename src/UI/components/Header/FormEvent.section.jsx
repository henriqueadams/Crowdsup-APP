import "./FormEvent.styles.css"
import { FormField, Spinner } from "../../components"
import { useState, useEffect } from "react"
import { useEventsApi, useIBGEApi } from "../../../hooks"
import { useGlobalToast, useGlobalModal } from "../../../context"
import { TOAST_MESSAGES } from "../../../constants/toast-messages"
import { FORM_CREATE_EVENT_VALIDATOR } from "../../../constants/form-validator"
export function AddEventForm() {
  const eventsApi = useEventsApi()
  const ibgeApi = useIBGEApi()
  const [, setGlobalToast] = useGlobalToast()
  const [, setGlobalModal] = useGlobalModal()
  const [isWaiting, setIsWaiting] = useState(false)
  const [stateList, setStateList] = useState([])
  const [cityList, setCityList] = useState([])
  const [errorList, setErrorList] = useState([])
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

  useEffect(() => {
    async function fetchCity() {
      try {
        const seletedStateId = stateList.find(
          (state) => state.nome === formData.Endereco.Estado
        ).id
        const response = await ibgeApi.listarMunicipios(seletedStateId)
        setCityList(response)
      } catch (error) {
        setGlobalToast((currentValue) => ({
          ...currentValue,
          showToast: true,
          content: TOAST_MESSAGES.DEFAULT_ERROR,
        }))
      }
    }
    if (formData.Endereco.Estado) {
      fetchCity()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ibgeApi, formData.Endereco.Estado, stateList])

  useEffect(() => {
    async function fetchEstados() {
      try {
        const response = await ibgeApi.listarEstados()
        setStateList(response)
      } catch (error) {
        setGlobalToast((currentValue) => ({
          ...currentValue,
          showToast: true,
          content: TOAST_MESSAGES.DEFAULT_ERROR,
        }))
      }
    }
    fetchEstados()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ibgeApi])

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
    const inputsAddressWithError = Object.keys(formData.Endereco)
      .filter((inputName) => {
        const value = formData.Endereco[inputName]
        const validatorFunction = FORM_CREATE_EVENT_VALIDATOR[inputName]
        const isFieldValid = validatorFunction(value)
        return !isFieldValid
      })
      .map((inputName) => inputName)
    const inputsWithError = Object.keys(formData)
      .filter((key) => key !== "Endereco")
      .filter((inputName) => {
        const value = formData[inputName]
        const validatorFunction = FORM_CREATE_EVENT_VALIDATOR[inputName]
        const isFieldValid = validatorFunction(value)
        return !isFieldValid
      })
    const allInputsWithError = [...inputsWithError, ...inputsAddressWithError]
    if (allInputsWithError.length) {
      return setErrorList(allInputsWithError)
    }
    try {
      setIsWaiting(true)
      await eventsApi.criarEvento(formData)
      setErrorList([])
      setIsWaiting(false)
      setGlobalModal((currentValue) => ({ ...currentValue, showModal: false }))
      setGlobalToast((currentValue) => ({
        ...currentValue,
        showToast: true,
        content: TOAST_MESSAGES.EVENT_REGISTER_SUCCESS,
      }))
    } catch (error) {
      setIsWaiting(false)
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
          label="Estado"
          name="Estado"
          type="select"
          content={stateList.map((state) => state.nome)}
          onChange={handleChangeEndereco}
          value={formData.Endereco.Estado}
          isError={errorList.includes("Estado")}
          isMandatory
          isHalf
        />
        <FormField
          label="Cidade"
          name="Cidade"
          type="select"
          content={cityList.map((state) => state.nome)}
          onChange={handleChangeEndereco}
          value={formData.Endereco.Cidade}
          isError={errorList.includes("Cidade")}
          isMandatory
          isHalf
        />
        <FormField
          label="Rua"
          name="Rua"
          type="text"
          onChange={handleChangeEndereco}
          value={formData.Endereco.Rua}
          isError={errorList.includes("Rua")}
        />
        <FormField
          label="Bairro"
          name="Bairro"
          type="text"
          onChange={handleChangeEndereco}
          isHalf
          value={formData.Endereco.Bairro}
          isError={errorList.includes("Bairro")}
        />

        <FormField
          label="Numero"
          name="Numero"
          type="number"
          onChange={handleChangeEndereco}
          isHalf
          value={formData.Endereco.Numero}
          isError={errorList.includes("Numero")}
        />
        <FormField
          label="Qtd. de Volutários"
          name="QuantidadeVoluntariosNecessarios"
          type="number"
          onChange={handleChange}
          value={formData.QuantidadeVoluntariosNecessarios}
          isHalf
          isError={errorList.includes("QuantidadeVoluntariosNecessarios")}
        />
        <FormField
          label="Data do evento"
          name="DataEvento"
          type="date"
          onChange={handleChange}
          value={formData.DataEvento}
          isHalf
          isError={errorList.includes("DataEvento")}
        />
        <FormField
          label="Titulo"
          name="Titulo"
          type="text"
          onChange={handleChange}
          value={formData.Titulo}
          isError={errorList.includes("Titulo")}
        />
        <FormField
          label="Descricao"
          name="Descricao"
          type="text"
          isTextArea
          onChange={handleChange}
          value={formData.Descricao}
          isError={errorList.includes("Descricao")}
        />
      </form>
      <button
        onClick={(event) => handleSubmit(event)}
        className="button-medium button-primary button-modal"
        type="submit"
      >
        {isWaiting ? <Spinner /> : "Divulgar"}
      </button>
    </div>
  )
}
