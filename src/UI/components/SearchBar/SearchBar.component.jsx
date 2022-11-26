import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SEARCH_ROUTE } from "../../../constants/routes"
import "./SearchBar.component.styles.css"

export function SearchBar() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  function handleSubmit() {
    navigate(SEARCH_ROUTE(search))
  }

  function handleChange(event) {
    const { value } = event.target
    setSearch(value)
  }

  return (
    <form onSubmit={handleSubmit} className="div-search-bar">
      <input
        className="input-search-bar"
        placeholder="Escreva alguma cidade para buscar ações sociais"
        type="text"
        value={search}
        onChange={handleChange}
      />
      <button className="button-search" />
    </form>
  )
}
