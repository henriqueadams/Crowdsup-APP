import "./Toast.component.styles.css"
import { useGlobalToast } from "../../../context"
import { useEffect } from "react"
export function Toast() {
  const [globalToast, setGlobalToast] = useGlobalToast()

  useEffect(() => {
    if (globalToast.showToast) {
      setTimeout(() => {
        setGlobalToast((currentValue) => ({
          ...currentValue,
          showToast: false,
        }))
      }, 5000)
    }
  }, [globalToast, setGlobalToast])

  function handleCloseError() {
    setGlobalToast((currentValue) => ({ ...currentValue, showToast: false }))
  }

  return globalToast.showToast ? (
    <div
      style={{
        backgroundColor: `${globalToast.content.color}`,
      }}
      className="div-toast"
    >
      <button className="button-close-toast" onClick={handleCloseError}>
        X
      </button>
      <h1 className="div-toast-info">{globalToast.content.message}</h1>
    </div>
  ) : null
}
