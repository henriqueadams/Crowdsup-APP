import { FormField, Spinner } from "../../components/"
import "./Perfil.screen.styles.css"
import { useState, useEffect } from "react"
import { useUserApi, useIBGEApi } from "../../../hooks"
import { useGlobalModal, useGlobalToast } from "../../../context"
import { TOAST_MESSAGES } from "../../../constants/toast-messages"
import { FORM_EDIT_VALIDATOR } from "../../../constants/form-validator"
export function EditPerfilForm() {
  const [, setGlobalToast] = useGlobalToast()
  const userApi = useUserApi()
  const ibgeApi = useIBGEApi()
  const [, setGlobalModal] = useGlobalModal()
  const [isWaiting, setIsWaiting] = useState(false)
  const [stateList, setStateList] = useState([])
  const [cityList, setCityList] = useState([])
  const [errorList, setErrorList] = useState([])
  const [loadingUserInfos, setLoadingUserInfos] = useState(true)

  const [formData, setFormData] = useState({
    Estado: "",
    Cidade: "",
    Telefone: "",
    FotoPerfil: "",
  })
  useEffect(() => {
    async function fetchUsuarioLogado() {
      const response = await userApi.detalhar()
      setFormData({
        Estado: response.estado,
        Cidade: response.cidade,
        Telefone: response.telefone,
        FotoPerfil: response.fotoPerfil || "",
      })
      setLoadingUserInfos(false)
    }
    fetchUsuarioLogado()
  }, [userApi])

  useEffect(() => {
    async function fetchCity() {
      try {
        const seletedStateId = stateList.find(
          (state) => state.nome === formData.Estado
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
    if (formData.Estado) {
      fetchCity()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ibgeApi, formData.Estado, stateList])

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
    const { name, value } = event.target
    setFormData((currentValue) => ({ ...currentValue, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const inputsWithError = Object.keys(formData)
      .filter((inputName) => {
        const value = formData[inputName]
        const validatorFunction = FORM_EDIT_VALIDATOR[inputName]
        const isFieldValid = validatorFunction(value)
        return !isFieldValid
      })
      .map((inputName) => inputName)
    if (inputsWithError.length) {
      return setErrorList(inputsWithError)
    }
    try {
      setIsWaiting(true)
      await userApi.editar(formData)
      setErrorList([])
      setIsWaiting(false)
      setGlobalToast((currentValue) => ({
        ...currentValue,
        showToast: true,
        content: TOAST_MESSAGES.EDIT_SUCCESS,
      }))
      setGlobalModal((currentValue) => ({
        ...currentValue,
        showModal: false,
      }))
    } catch (error) {
      setIsWaiting(false)
      setGlobalToast((currentValue) => ({
        ...currentValue,
        showToast: true,
        content: TOAST_MESSAGES.EDIT_ERROR,
      }))
    }
  }

  return (
    <div className="form-edit-modal-wrapper">
      <h2 className="form-edit-title">Editar perfil</h2>
      {loadingUserInfos ? (
        <Spinner />
      ) : (
        <form className="form-edit">
          <FormField
            label="Estado"
            name="Estado"
            type="select"
            content={stateList.map((state) => state.nome)}
            onChange={handleChange}
            value={formData.Estado}
            isError={errorList.includes("Estado")}
          />
          <FormField
            label="Cidade"
            name="Cidade"
            type="select"
            content={cityList.map((state) => state.nome)}
            onChange={handleChange}
            value={formData.Cidade}
            isError={errorList.includes("Cidade")}
          />

          <FormField
            label="Telefone"
            name="Telefone"
            type="text"
            onChange={handleChange}
            value={formData.Telefone}
            isError={errorList.includes("Telefone")}
          />
          <FormField
            label="Foto de perfil"
            name="FotoPerfil"
            type="text"
            onChange={handleChange}
            value={formData.FotoPerfil}
            isError={errorList.includes("FotoPerfil")}
          />
        </form>
      )}

      <button
        onClick={(event) => handleSubmit(event)}
        className="button-medium button-primary button-modal"
        type="submit"
      >
        {isWaiting ? <Spinner /> : "Editar"}
      </button>
    </div>
  )
}
