import "./Register.screen.styles.css"
import { useNavigate } from "react-router-dom"
import { FormField } from "../../components"
import { useState } from "react"
import { useUserApi } from "../../../hooks"

export function Register() {
  const navigate = useNavigate()
  const userApi = useUserApi()

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

  console.log(formData)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentValue) => ({ ...currentValue, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    formData.Sexo = parseInt(formData.Sexo)
    try {
      await userApi.registrar(formData)
      console.log("é pra ter funcionado")
    } catch (error) {
      console.log(error)
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
          />
          <FormField
            label="Nome completo"
            name="Nome"
            type="text"
            isHalf
            onChange={handleChange}
          />
          <FormField
            label="Senha"
            name="Senha"
            type="password"
            isHalf
            onChange={handleChange}
          />
          <FormField
            label="Data de nascimento"
            name="DataNascimento"
            type="date"
            isHalf
            onChange={handleChange}
          />
          <FormField
            label="Estado"
            name="Estado"
            type="text"
            isHalf
            onChange={handleChange}
          />
          <FormField
            label="Cidade"
            name="Cidade"
            type="text"
            isHalf
            onChange={handleChange}
          />
          <FormField
            label="Telefone"
            name="Telefone"
            type="text"
            isHalf
            onChange={handleChange}
          />
          <FormField label="Sexo" name="Sexo" type="radio" isHalf>
            <input
              type="radio"
              name="Sexo"
              id="man"
              value={1}
              onChange={handleChange}
              checked={formData.Sexo === "1"}
            />
            <label htmlFor="man">Masculino</label>
            <input
              checked={formData.Sexo === "2"}
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
            Registrar
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
