import "./Toast.component.styles.css"
import { useGlobalToast } from "../../../context"
export function Toast() {
  const [globalToast, setGlobalToast] = useGlobalToast()

  function handleCloseError() {
    setGlobalToast((currentValue) => ({ ...currentValue, showToast: false }))
  }

  return globalToast.showToast ? (
    <div
      style={{
        backgroundColor: `${globalToast.color}`,
      }}
      className="div-toast"
    >
      <button className="button-close-toast" onClick={handleCloseError}>
        X
      </button>
      <h1 className="div-toast-info">{globalToast.message}</h1>
    </div>
  ) : null
}
