import { useState, useEffect } from "react"

export function useInfinityScroll(
  apiHook,
  pageNumber,
  setLista,
  setPageNumber,
  atualizacoesUseEffect,
  parametrosAdicionais = []
) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setHasMore(true)
    setPageNumber(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...atualizacoesUseEffect])

  useEffect(() => {
    if (hasMore) {
      setLoading(true)
      setError(false)
      apiHook(pageNumber, ...parametrosAdicionais)
        .then((res) => {
          if (res.eventos.length === 0) {
            setLoading(false)
            return setHasMore(false)
          }
          if (pageNumber === 1) {
            setLista(res.eventos)
          } else {
            setLista((prevItems) => [...prevItems, ...res.eventos])
          }
          setLoading(false)
        })
        .catch((e) => {
          setLoading(false)
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, hasMore])

  return { loading, error, hasMore }
}
