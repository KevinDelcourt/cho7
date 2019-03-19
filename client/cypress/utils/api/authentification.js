import { getRequest, postRequest } from './index'

export const login = (credentials,cb) =>
    postRequest('/login',credentials,cb)

export const loginAsCreateur = () => login({username: "Admin", password: "Admin"},(res)=>{
    expect(res.body).to.include('s:')
})

export const logout = () => getRequest('/logout',(res)=>{
    expect(res.body).to.have.property('loggedOut',true)
})

export const has_role = (role,cb) => getRequest('/has_role/'+role,cb)

export const isCreateur = () => has_role("CREATEUR",(res)=>{
    expect(res.body).to.be.true
})

export const isNotCreateur = () => has_role("CREATEUR",(res)=>{
    expect(res.body).to.be.false
})