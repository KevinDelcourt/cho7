import {
    getCreation,
    getCreationsFinies,
    getCreationsEnCours,
    getEtatsAvancement
} from "../../../utils/api/creation"
import reset_db from "../../../utils/reset_db"

before(() => reset_db())

describe("get creation", () => {
    it("peut retourner une création finie", () =>
        getCreation(1, res => {
            expect(res.body.nomfichier).to.eql("oui.mp3")
        }))

    it("peut retourner une création en cours", () =>
        getCreation(2, res => {
            expect(res.body.nomfichier).to.be.null
        }))

    it("peut retourner les etats d'avancement d'une création en cours", () =>
        getEtatsAvancement(2, res => {
            expect(res.body.length).to.eql(2)
        }))
})

describe("get creations", () => {
    it("liste des créations finies", () =>
        getCreationsFinies(res => {
            expect(res.body.length).to.eql(2)
            expect(res.body[0].id).to.be.lessThan(res.body[1].id)
        }))

    it("liste des créations en cours", () =>
        getCreationsEnCours(res => {
            expect(res.body.length).to.eql(2)
            expect(res.body[0].id).to.be.lessThan(res.body[1].id)
        }))
})
