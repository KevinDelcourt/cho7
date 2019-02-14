import axios from 'axios'
import cookies from 'browser-cookies'

export const login = (username,password) => axios.post('http://localhost:8180/login',{
    username: username,
    password: password
}).then((response)=>{
    console.log(response)
    if(response.data && response.data.substring(0,1) === 's'){
        cookies.set('connect.sid', response.data)
        return true
    }else
        return false
}).catch((error)=>{
    console.log(error)
    return false
})

export const logout = () => axios.get('http://localhost:8180/logout',{withCredentials:true})
.then((response) => {
    console.log(response)
    return true
}).catch((error)=>{
    console.log(error)
    return false
})

export const hasRole = (role) => axios.get('http://localhost:8180/has_role/'+role,{withCredentials:true})
.then((response) => {
    console.log(response)
    return response.data
}).catch((error)=>{
    console.log(error)
    return false
})

export const getUser = () => axios.get('http://localhost:8180/user/',{withCredentials:true})
.then((response) => {
    console.log(response)
    return response.data
}).catch((error)=>{
    console.log(error)
    return false
})

export const getCreateur = () => axios.get('http://localhost:8180/createur/')
.then((response) => {
    console.log(response)
    return response.data
}).catch((error)=>{
    console.log(error)
    return false
})

export const getCreations = () => axios.get('http://localhost:8180/creations')
.then((response)=>{
    console.log(response)
    return response.data
}).catch((error)=>{
    console.log(error)
    return false
})