import createGlobalState from "react-create-global-state"

const stringifyToast = localStorage.getItem("toast")

const toast = JSON.parse(stringifyToast) || {}

const [_useGlobalToast, ToastGlobalProvider] =
  createGlobalState(toast)

const useGlobalToast = () => {
  const [globalToast, _setGlobalToast] = _useGlobalToast()

  const setGlobalToast = (toast) => {
    if (Object.keys(toast).length) {
      localStorage.setItem("toast", JSON.stringify(toast))
    } else {
      localStorage.removeItem("toast")
    }
    _setGlobalToast(toast)
  }

  return [globalToast, setGlobalToast]
}

export { useGlobalToast, ToastGlobalProvider }
