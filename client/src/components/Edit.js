import React, {useContext, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import './Edit.css'



export const Edit = ({editContactItem, fetchContacts, setEditBox}) => {
    const {loading,request} = useHttp()
    const {access_token, auth} = useContext(AuthContext)


    const [input, setInput] = useState(
        {
            name:editContactItem.name,
            lname:editContactItem.lname,
            phone:editContactItem.phone,
            zip:editContactItem.address.zip,
            city: editContactItem.address.city,
            street:editContactItem.address.street,
            house:editContactItem.address.house,
            flat:editContactItem.address.flat
        }
    )



    const handleOnChange = event => {
        const { id, value } = event.target;
        setInput({ ...input, [id]: value });
        console.log(input)
    };

    const editContact = async  () => {
        console.log(input)
        try {
            const data = await request(`http://localhost:8000/contacts/${editContactItem.id}`,'PATCH',{
                name:input.name,
                lname:input.lname,
                phone:input.phone,
                address:{
                    zip:input.zip,
                    city:input.city,
                    street:input.street,
                    house:input.house,
                    flat:input.flat
                }
            },{
                Authorization:`Bearer ${access_token}`
            })
            console.log('После нажатия',data)
        } catch (e) {}
        fetchContacts()
    }
    return(
        <div className="edit__box">
            <h5>Редактирование</h5>
        <div className="col s8 offset-s2 m6" >
            <div className="row">
                <div className="input-field col s6">
                    <input placeholder="Имя"
                           id="name"
                           type="text"
                           value={input.name}
                           onChange={handleOnChange}/>
                </div>
                <div className="input-field col s6">
                    <input placeholder="Фамилия"
                           id="lname"
                           type="text"
                           value={input.lname}
                           onChange={handleOnChange}/>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s6">
                    <input placeholder="Телефон"
                           id="phone"
                           type="text"
                           value={input.phone}
                           onChange={handleOnChange}/>
                </div>
                <div className="input-field col s6">
                    <input placeholder="Индекс"
                           id="zip"
                           type="text"
                           value={input.zip}
                           onChange={handleOnChange}/>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s6">
                    <input placeholder="Город"
                           id="city"
                           type="text"
                           value={input.city}
                           onChange={handleOnChange}/>
                </div>
                <div className="input-field col s6">
                    <input placeholder="Улица"
                           id="street"
                           type="text"
                           value={input.street}
                           onChange={handleOnChange}/>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s6">
                    <input placeholder="Дом"
                           id="house"
                           type="text"
                           value={input.house}
                           onChange={handleOnChange}/>
                </div>
                <div className="input-field col s6">
                    <input placeholder="Квартира"
                           id="flat"
                           type="text"
                           value={input.flat}
                           onChange={handleOnChange}/>
                </div>
            </div>


            <div className="input-field">
                <button className ="btn"onClick={editContact}>Отправить</button>
                <button className="btn" onClick={() => setEditBox(false)}>Отмена</button>
            </div>

        </div>
    </div>
    )}