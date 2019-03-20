import getApiUrl from "../../../src/modules/apiURL"
import { loginAsCreateur, logout } from "./authentification"

export const getRequest = (url, cb) =>
    cy.request(getApiUrl() + url).then(res => {
        expect(res.headers["content-type"]).to.include("application/json")
        if (cb) cb(res)
    })

export const postRequest = (url, data, cb) =>
    cy.request("POST", getApiUrl() + url, data).then(res => {
        expect(res.headers["content-type"]).to.include("application/json")
        if (cb) cb(res)
    })

export const expectToHaveProperties = (obj, propNameArray) => {
    for (let val of propNameArray) expect(obj).to.have.property(val)
}

export const buildFormData = jsonObj => {
    let formdata = new FormData()
    for (let prop in jsonObj) formdata.append(prop, jsonObj.prop)
    return formdata
}

export const neMarchePasSiPasConnecte = req => {
    it("ne marche pas si pas connecté", () => {
        logout()
        req(res => {
            expect(res.body).to.be.false
        })
    })
}
