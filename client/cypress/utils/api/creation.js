import { getRequest, postRequest, expectToHaveProperties } from "./index"

export const isValidCreation = creation =>
    expectToHaveProperties(creation, [
        "id",
        "miseajour",
        "nomfichier",
        "titre",
        "description",
        "nbecoute",
        "sommenotes",
        "nbnote"
    ])

export const isValidEtatAvancement = etat =>
    expectToHaveProperties(etat, [
        "id",
        "libelle",
        "valeuravancement",
        "idcreation"
    ])

export const getCreation = (id, cb) =>
    getRequest("/creation/" + id, res => {
        expect(res.body).to.have.property("id", id)
        isValidCreation(res.body)
        cb(res)
    })

export const getEtatsAvancement = (idCreation, cb) =>
    getRequest("/etatsCreation/" + idCreation, res => {
        for (let etat of res.body) {
            isValidEtatAvancement(etat)
            expect(etat.idcreation).to.eql(idCreation)
        }
        cb(res)
    })

export const getCreationsFinies = cb =>
    getRequest("/creations/done", res => {
        for (let item of res.body) {
            isValidCreation(item)
            expect(item.nomfichier).to.be.not.null
        }
        cb(res)
    })

export const getCreationsEnCours = cb =>
    getRequest("/creations/inprogress", res => {
        for (let item of res.body) {
            isValidCreation(item)
            expect(item.nomfichier).to.be.null
        }
        cb(res)
    })

export const postNewCreation = (formData, cb) =>
    postRequest("/addcreation", formData, res => {
        cb(res)
    })

export const postUpdateCreation = (formData, cb) =>
    postRequest("/updateCreation", formData, res => {
        cb(res)
    })
