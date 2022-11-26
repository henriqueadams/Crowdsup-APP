import "./Login.screen.styles.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useUserApi } from "../../../hooks"
import { useGlobalUser, useGlobalToast } from "../../../context"
import { TOAST_MESSAGES } from "../../../constants/toast-messages"
import { Spinner, FormField } from "../../components"
import { HOME_ROUTE } from "../../../constants/routes"

export function Login() {
  const [, setGlobalToast] = useGlobalToast()
  const navigate = useNavigate()
  const userApi = useUserApi()
  const [, setGlobalUser] = useGlobalUser()
  const [isWaiting, setIsWaiting] = useState(false)
  const [formData, setFormData] = useState({
    Email: "",
    Senha: "",
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentValue) => ({ ...currentValue, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      setIsWaiting(true)
      const response = await userApi.login(formData)
      setIsWaiting(false)
      setGlobalUser(`Bearer ${response}`)
      setGlobalToast((currentValue) => ({
        ...currentValue,
        showToast: true,
        content: TOAST_MESSAGES.LOGIN_SUCCESS,
      }))
      navigate(HOME_ROUTE)
    } catch (error) {
      console.log(error)

      setIsWaiting(false)
      setGlobalToast((currentValue) => ({
        ...currentValue,
        showToast: true,
        content:
          error?.response?.status === 401
            ? TOAST_MESSAGES.LOGIN_PASSWORD_ERROR
            : TOAST_MESSAGES.LOGIN_ERROR,
      }))
    }
  }

  return (
    <div className="background login-background">
      <div className="div-form div-form-login">
        <h1>Crowdsup</h1>
        <form className="form-login">
          <FormField
            label="E-mail"
            type="text"
            name="Email"
            onChange={handleChange}
          />
          <FormField
            label="Senha"
            type="password"
            name="Senha"
            onChange={handleChange}
          />
        </form>
        <div className="form-footer">
          <button
            onClick={(event) => handleSubmit(event)}
            className="button-large button-primary"
          >
            {isWaiting ? <Spinner /> : "Login"}
          </button>
          <div className="form-footer-sing-in-up">
            <p>Não possui uma conta?</p>
            <span onClick={() => navigate("/register")}>Registre-se</span>
          </div>
        </div>
      </div>
    </div>
  )
}
