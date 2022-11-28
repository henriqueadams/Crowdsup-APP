import "./Register.screen.styles.css"
import { useNavigate } from "react-router-dom"
import { FormField, Spinner } from "../../components"
import { useState } from "react"
import { useUserApi, useIBGEApi } from "../../../hooks"
import { useGlobalToast } from "../../../context"
import { TOAST_MESSAGES } from "../../../constants/toast-messages"
import { FORM_REGISTER_VALIDATOR } from "../../../constants/form-validator"
import { LOGIN_ROUTE } from "../../../constants/routes"
import { useEffect } from "react"
export function Register() {
  const [, setGlobalToast] = useGlobalToast()
  const navigate = useNavigate()
  const userApi = useUserApi()
  const ibgeApi = useIBGEApi()
  const [isWaiting, setIsWaiting] = useState(false)
  const [stateList, setStateList] = useState([])
  const [cityList, setCityList] = useState([])
  const [errorList, setErrorList] = useState([])

  const [formData, setFormData] = useState({
    Email: "",
    Nome: "",
    Senha: "",
    DataNascimento: "",
    Estado: "",
    Cidade: "",
    Telefone: "",
    Sexo: 1,
  })

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

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentValue) => ({ ...currentValue, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    formData.Sexo = parseInt(formData.Sexo)
    const inputsWithError = Object.keys(formData)
      .filter((inputName) => {
        const value = formData[inputName]
        const validatorFunction = FORM_REGISTER_VALIDATOR[inputName]
        const isFieldValid = validatorFunction(value)
        return !isFieldValid
      })
      .map((inputName) => inputName)
    if (inputsWithError.length) {
      return setErrorList(inputsWithError)
    }
    try {
      setIsWaiting(true)
      await userApi.registrar(formData)
      setErrorList([])
      setIsWaiting(false)
      setGlobalToast((currentValue) => ({
        ...currentValue,
        showToast: true,
        content: TOAST_MESSAGES.REGISTER_SUCCESS,
      }))
      navigate(LOGIN_ROUTE)
    } catch (error) {
      setIsWaiting(false)
      setGlobalToast((currentValue) => ({
        ...currentValue,
        showToast: true,
        content: TOAST_MESSAGES.REGISTER_ERROR,
      }))
    }
  }

  return (
    <div className="background login-background">
      <div className="div-form div-form-register">
        <h1>Registro</h1>
        <form className="form-resgister">
          <FormField
            label="E-mail"
            name="Email"
            type="text"
            onChange={handleChange}
            isMandatory
            isError={errorList.includes("Email")}
          />
          <FormField
            label="Nome completo"
            name="Nome"
            type="text"
            isHalf
            onChange={handleChange}
            isMandatory
            isError={errorList.includes("Nome")}
          />
          <FormField
            label="Senha"
            name="Senha"
            type="password"
            isHalf
            onChange={handleChange}
            isMandatory
            isError={errorList.includes("Senha")}
          />
          <FormField
            label="Data de nascimento"
            name="DataNascimento"
            type="date"
            isHalf
            onChange={handleChange}
            isMandatory
            isError={errorList.includes("DataNascimento")}
          />
          <FormField
            label="Estado"
            name="Estado"
            type="select"
            content={stateList.map((state) => state.nome)}
            isHalf
            onChange={handleChange}
            isMandatory
            isError={errorList.includes("Estado")}
          />
          <FormField
            label="Cidade"
            name="Cidade"
            type="select"
            content={cityList.map((state) => state.nome)}
            isHalf
            onChange={handleChange}
            isMandatory
            isError={errorList.includes("Cidade")}
          />
          <FormField
            label="Telefone"
            name="Telefone"
            type="text"
            maxLength={11}
            isHalf
            onChange={handleChange}
            isMandatory
            isError={errorList.includes("Telefone")}
          />
          <FormField
            label="Sexo"
            name="Sexo"
            type="radio"
            isHalf
            isMandatory
            isError={errorList.includes("Sexo")}
          >
            <input
              type="radio"
              name="Sexo"
              id="man"
              value={1}
              onChange={handleChange}
              checked={formData.Sexo === 1}
            />
            <label htmlFor="man">Masculino</label>
            <input
              checked={formData.Sexo === 2}
              type="radio"
              name="Sexo"
              id="woman"
              value={2}
              onChange={handleChange}
            />
            <label htmlFor="woman">Feminino</label>
          </FormField>
        </form>
        <div className="form-footer">
          <button
            onClick={(event) => handleSubmit(event)}
            className="button-large button-primary"
            type="submit"
          >
            {isWaiting ? <Spinner /> : "Registrar"}
          </button>
          <div className="form-footer-sing-in-up">
            <p>Já possui uma conta?</p>
            <span onClick={() => navigate("/")}>Login</span>
          </div>
        </div>
      </div>
    </div>
  )
}
