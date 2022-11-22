import "./Login.screen.styles.css"
import { useNavigate } from "react-router-dom"
import { FormField } from "../../components/FormField/FormField.components"
import { useState } from "react"
import { useUserApi } from "../../../hooks"

export function Login() {
  const navigate = useNavigate()
  const userApi = useUserApi()

  const [formData, setFormData] = useState({
    Email: "",
    Senha: "",
  })

  console.log(formData)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentValue) => ({ ...currentValue, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    console.log("aqui")
    try {
      const response = await userApi.login(formData)
      const object = JSON.parse(atob(response.split(".")[1]))
      console.log(object)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="background login-background">
      <div className="div-form div-form-login">
        <h1>Crowdsup</h1>
        <form action="" className="form-login">
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
            Login
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
