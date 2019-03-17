import axios from 'axios'
import cookies from 'browser-cookies'
import groupBy from 'lodash/groupBy'
import getApiUrl from "./apiURL";
const baseUrl = getApiUrl()

const axiosDefault = (request, callback, errorHandler) => request().then((response)=>{
    if(callback)
        return callback(response)
    else
        return response.data
}).catch((error)=>{
    if(errorHandler)
        errorHandler(error)
    else{
        console.log(error)
        return false
    }    
})

const defaultGet = (url,options) => axiosDefault(
    () => axios.get(baseUrl + url, options)
)

const defaultPost = (url,data) => axiosDefault(
    () => axios(baseUrl + url, {
        method: "post",
        data: data,
        withCredentials: true
    })
)

export const login = (username, password) => axiosDefault(
    () => axios.post(baseUrl + '/login',{
        username: username,
        password: password
    }),
    (response) => {
        if(response.data && response.data.substring(0,1) === 's'){
            cookies.set('connect.sid', response.data)
            return true
        }else
            return false
    }
)

export const logout = () => axiosDefault(
    () => axios.get(baseUrl + '/logout',{withCredentials: true}),
    () => true
)

export const hasRole = (role) => defaultGet('/has_role/'+role, {withCredentials: true})

export const getUser = () => defaultGet('/user/',{withCredentials: true})

export const getCreateur = () => defaultGet('/createur')

export const getEtatsCreation = (idCreation) => defaultGet('/etatsCreation/' + idCreation)

export const getCreation = (id) => defaultGet('/creation/' + id)

export const getCreations = () => defaultGet('/creations/done')

export const getCreationsInProgress = () => defaultGet('/creations/inprogress')

export const getAvencement = () => axiosDefault(
    () => axios.get(baseUrl + '/avencement'),
    (response) => {
        let grouped = groupBy(response.data,projet => projet.titre)
        let data = []
        for(let obj in grouped)
            data.push(grouped[obj])
        return data
    }
)

export const postProfilCreateur = (formData) => defaultPost("/renseignerprofil",formData)

export const deleteCreation = (id) => defaultPost("/suprCreation",{id: id})

export const postNewCreation = (formData) => defaultPost("/addcreation",formData)

export const postUpdateCreation = (formData) => defaultPost("/updateCreation",formData)