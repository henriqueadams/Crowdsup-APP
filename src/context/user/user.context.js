import createGlobalState from "react-create-global-state"
import { USER_KEY } from "../../constants/storage"

const stringifyUser = localStorage.getItem(USER_KEY)

const user = JSON.parse(stringifyUser) || {}

const [_useGlobalUser, UserGlobalProvider] = createGlobalState(user)

const useGlobalUser = () => {
  const [globalUser, _setGlobalUser] = _useGlobalUser()

  const setGlobalUser = (user) => {
    if (Object.keys(user).length) {
      localStorage.setItem(USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(USER_KEY)
    }
    _setGlobalUser(user)
  }

  return [globalUser, setGlobalUser]
}

export { useGlobalUser, UserGlobalProvider }
