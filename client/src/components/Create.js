import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {NavLink, useHistory} from 'react-router-dom'
import {Loader} from "./Loader";

export const Create =() => {
    const history = useHistory()
    const auth = useContext(AuthContext)



    const {request} = useHttp()

    const [input, setInput] = useState({name:'',lname:'',phone:'',zip:'',city:'',street:'',house:'',flat:''})


    const handleOnChange = event => {
        const { id, value } = event.target;
        setInput({ ...input, [id]: value });
        console.log(input)
    };

    const sendContact = async  () => {
        console.log(input)
            try {
               const data = await request('/contacts','POST',{
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
                   Authorization:`Bearer ${auth.access_token}`
               })
               console.log('После нажатия',data)
            } catch (e) {}
    }

    return(
        <div className ="row">
            <div className="col s8 offset-s2" style={{paddingTop:'2rem'}}>
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
                        <NavLink to='/'><button className ="btn"onClick={sendContact}>добавить</button></NavLink>
                    </div>

            </div>
        </div>
    )
}