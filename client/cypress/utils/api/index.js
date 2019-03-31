import getApiUrl from "../../../src/modules/apiURL"
import { logout } from "./authentification"

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

export const deleteRequest = (url, cb) =>
    cy.request("DELETE", getApiUrl() + url).then(res => {
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

export const erreurSi = (testName, req, expected) => {
    it("Erreur si: " + testName, () => {
        req(res => {
            for (let key in expected)
                expect(res.body).to.have.property(key, expected[key])
        })
    })
}

export const erreurSiValeurTropLongue = (val, req) => {
    let json = {}
    json[val] = "Trop long"
    erreurSi(val + " trop long", req, json)
}
