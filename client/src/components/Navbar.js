import React, {useContext} from 'react'
import {NavLink,useHistory} from 'react-router-dom'
import {AuthContext} from "../context/auth.context";

import './Navbar.css'


export const Navbar =() => {
    const auth = useContext(AuthContext)
    const history = useHistory()

    const logoutHandler = event  => {
        event.preventDefault()
        auth.logout()
        history.push('/')

    }
    return(
        <nav>
            <div className="nav-wrapper purple lighten-4" >
                <span   className="brand-logo">Контакты</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to='/create'>Создание контакта</NavLink></li>
                    <li><NavLink to='/contacts'>Контакты</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>

                </ul>
            </div>
        </nav>
    )
}

