import "./NotFound.screen.styles.css"
import { useNavigate } from "react-router-dom"
import { HOME_ROUTE } from "../../../constants/routes"
export function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="background default-background-color not-found-screen">
      <h3 className="event-title-perfil medium-text-perfil">
        Não encontramos a página que deseja
      </h3>
      <button
        onClick={() => navigate(HOME_ROUTE)}
        className="button-large button-primary"
      >
        Voltar para o inicio
      </button>
    </div>
  )
}
