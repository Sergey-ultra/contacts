import {useState, useCallback, useEffect}  from 'react'

const storageName = 'userData'
export const useAuth = () => {
    const [ready, setReady] = useState(false)
    const [access_token, setAccessToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken,id)=> {
        setAccessToken(jwtToken)
        setUserId(id)
         //что такое localStorage?
        localStorage.setItem(storageName,JSON.stringify({
            userId:id,token:jwtToken}))
    },[])


    const logout = useCallback(()=> {
        setAccessToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    },[])


    useEffect(()=> {
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data && data.token){
            login(data.token, data.userId)
        }
        setReady(true)
    },[login])


    return {login, logout, access_token, userId,ready}
}