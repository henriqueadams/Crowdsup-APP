import './SearchBar.component.styles.css'

export function SearchBar() {
    return (
        <div className='div-search-bar'>
            <input className='input-search-bar'
                placeholder='Escreva alguma cidade para buscar ações sociais'
                type="text" />
            <button className='button-search' />
        </div>
    )
}