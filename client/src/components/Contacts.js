import React, {Fragment, useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {Loader} from "./Loader";
import {ContactList} from "./ContactList";
import './Contacts.css'

export const Contacts =() => {
    const [contacts,setContacts] = useState([])
    const [search,setSearch] = useState("")
    const {loading,request} = useHttp()
    const {access_token, auth} = useContext(AuthContext)
    console.log(auth)
    console.log(access_token)

    const fetchContacts = useCallback(async () => {
        try {
            const fetched = await request('http://localhost:8000/contacts','GET',null, {
                Authorization: `Bearer ${access_token} `
                })
            setContacts(fetched)
            if (!fetched ){auth.login (null, null)}

        } catch (e) {
        }
    }, [access_token,request])

    useEffect(() => {
        fetchContacts()
    }, [fetchContacts])

    const searchItems = async  event => {
        if (event.key === 'Enter') {
            try {
                const data = await request(`http://localhost:8000/contacts?q=${search}`,'GET',null, {
                    Authorization: `Bearer ${access_token} `
                })
                console.log(data)
                setContacts(data)

            } catch (e) {}
        }

    }


    if (loading) {
        return <Loader/>
    }
    return (
        <Fragment>
            <div className="search__box">
                <i className="material-icons" >search</i>
                <input placeholder="Поиск"
                       id="search"
                       type="text"
                       value={search}
                       onKeyPress={searchItems}
                       onChange={event=>setSearch(event.target.value)}/>
            </div>
            {!loading && <ContactList contacts={contacts} request={request} access_token={access_token}
                                      fetchContacts={fetchContacts}/>}
        </Fragment>
    )
}