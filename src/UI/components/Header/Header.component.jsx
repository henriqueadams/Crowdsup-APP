import { SearchBar } from '../SearchBar/SearchBar.component'
import './Header.component.styles.css'
import { useState } from 'react'
export function Header() {
    const [dropdown, setDropDown] = useState()

    return (
        <div className='div-header'>
            <div className='container-header div-header-content'>
                <h1 className='logo-header'>Crowdsup</h1>
                <SearchBar />
                <div className='div-menu'>
                    <div onClick={() => setDropDown(!dropdown)} className='user-image' />
                    {
                        dropdown &&
                        <ul className='dropdown'>
                            <li>Meu perfil</li>
                            <li>Calendario</li>
                            <li>Adicionar Evento</li>
                            <li>Logout</li>
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
}