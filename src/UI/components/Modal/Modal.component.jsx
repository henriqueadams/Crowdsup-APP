import "./Modal.component.styles.css"
import { useGlobalModal } from "../../../context"

export function Modal() {
  const [globalModal, setGlobalModal] = useGlobalModal()

  function handleClose() {
    setGlobalModal((currentValue) => ({ ...currentValue, showModal: false }))
  }

  return globalModal.showModal ? (
    <div className="div-modal-background">
      <div className="div-modal-content">
        <button className="button-close-modal" onClick={handleClose}>
          X
        </button>
        {globalModal.content && globalModal.content()}
      </div>
    </div>
  ) : null
}
