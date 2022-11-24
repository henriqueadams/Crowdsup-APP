import createGlobalState from "react-create-global-state"

const stringifyModal = localStorage.getItem("modal")

const modal = JSON.parse(stringifyModal) || {}

const [_useGlobalModal, ModalGlobalProvider] =
    createGlobalState(modal)

const useGlobalModal = () => {
    const [globalModal, _setGlobalModal] = _useGlobalModal()

    const setGlobalModal = (modal) => {
        if (Object.keys(modal).length) {
            localStorage.setItem("modal", JSON.stringify(modal))
        } else {
            localStorage.removeItem("modal")
        }
        _setGlobalModal(modal)
    }

    return [globalModal, setGlobalModal]
}

export { useGlobalModal, ModalGlobalProvider }
