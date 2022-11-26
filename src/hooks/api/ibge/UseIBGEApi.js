import { useMemo } from "react"
import { IBGE_API_ROUTE } from "../../../constants/routes"
import { useHttp } from "../base/UseHttp.hook"

export function useIBGEApi() {
  const httpInstance = useHttp(IBGE_API_ROUTE)

  async function listarEstados() {
    const response = await httpInstance.get("/estados")
    return response
  }

  async function listarMunicipios(municipioid) {
    const response = await httpInstance.get(
      `/estados/${municipioid}/municipios`
    )
    return response
  }

  return useMemo(
    () => ({
      listarEstados,
      listarMunicipios,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}
