import React, {Fragment, useState} from 'react'
import  './contactList.css'
import {Edit} from "./Edit";





export const ContactList = ({contacts,request, access_token, fetchContacts}) => {

    const [editBox,setEditBox]=useState(false)
    const [deleteBox,setDeleteBox]=useState(false)
    const [editNumber,setEditNumber]=useState(null)
    const [deleteNumber,setDeleteNumber]=useState(null)



    const deleteSelected = deleteNumber => {
        try {
             request(`http://localhost:8000/contacts/${deleteNumber}`,'DELETE',null, {
                Authorization: `Bearer ${access_token} `
            })

        } catch (e) {
        }
        setDeleteBox(false)
        fetchContacts()
    }



    if(!contacts.length) {
        return (<p className = "center"> Лист контактов пустой, добавьте свой первый контакт, используя кнопку добавить</p>)
    }

    return(
        <Fragment>
            {deleteBox &&
                <div className="delete__box">
                    <div className="delete__wrapper">
                        Вы уверены, что хотите <strong>удалить эту запись?</strong>
                         <div className="buttons">
                             <div className="btn" onClick={() => deleteSelected(deleteNumber)}>Удалить</div>
                             <div class="btn" onClick={() => setDeleteBox(false)}>Отмена</div>

                        </div>
                    </div>
                </div>
            }
            {editBox &&
                <Edit editContactItem ={contacts[editNumber]}
                      fetchContacts={fetchContacts}
                      setEditBox={setEditBox}/>}
            <table>
                <thead>
                    <td>номер</td>
                    <td>имя</td>
                    <td>фамилия</td>
                    <td>телефон</td>
                    <td>индекс</td>
                    <td>город</td>
                    <td>улица</td>
                    <td>дом</td>
                    <td>квартира</td>
                    <td>редакт.</td>
                    <td>удалить</td>
                </thead>
                <tbody>
                {contacts.map((contact,index) => {
                    return(
                        <tr key ={index} className="contact">
                            <td>{index +1}</td>
                            <td>{contact.name}</td>
                            <td>{contact.lname}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.address.zip}</td>
                            <td>{contact.address.city}</td>
                            <td>{contact.address.street}</td>
                            <td>{contact.address.house}</td>
                            <td>{contact.address.flat}</td>
                            <td onClick={() => {
                                setEditBox(true)
                                setEditNumber(index)
                            }}><i className="material-icons" >edit</i></td>
                            <td onClick={() => {
                                setDeleteBox(true)
                                setDeleteNumber(contact.id )
                            }}><i className="material-icons">delete</i></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </Fragment>
    )
}