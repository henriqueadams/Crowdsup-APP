import axios from "axios"
import { useGlobalUser } from "../../../context"

export function useHttp(baseURL, headers) {
  const [user, setGlobalUser] = useGlobalUser()

  const instance = axios.create({
    baseURL: baseURL,
    headers: {
      ...headers,
      Authorization: user,
    },
  })

  async function get(url) {
    try {
      const response = await instance.get(url)
      return response.data
    } catch (error) {
      if (error.response.status === 401) {
        setGlobalUser({})
      }
      throw error
    }
  }

  async function post(url, data, headers) {
    try {
      const response = await instance.post(url, data, headers)
      return response.data
    } catch (error) {
      if (error.response.status === 401) {
        setGlobalUser({})
      }
      throw error
    }
  }

  async function put(url, data) {
    try {
      const response = await instance.put(url, data)
      return response.data
    } catch (error) {
      if (error.response.status === 401) {
        setGlobalUser({})
      }
      throw error
    }
  }

  async function remover(url, data) {
    try {
      const response = await instance.delete(url, data)
      return response.data
    } catch (error) {
      if (error.response.status === 401) {
        setGlobalUser({})
      }
      throw error
    }
  }

  return {
    get,
    post,
    put,
    remover,
  }
}
