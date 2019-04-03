import { longString } from "../../../utils/functions"
import { login, loginAsCreateur } from "../../../utils/api/authentification"
import reset_db from "../../../utils/reset_db"

const badPassword = {
    username: "Admin",
    password: "ab"
}

const badUsername = {
    username: "d",
    password: "Admin"
}

const tentativeInjectionSQL = {
    username: "Admin",
    password: "' OR 1 LIKE 1;"
}

const longValues = {
    username: longString(51),
    password: longString(65)
}

before(() => reset_db())

describe("/login", () => {
    it("Mauvais mot de passe", () => {
        login(badPassword, res => {
            expect(res.body).to.not.have.property("username")
            expect(res.body).to.have.property(
                "password",
                "Mauvais mot de passe"
            )
        })
    })

    it("Mauvais nom utilisateur", () => {
        login(badUsername, res => {
            expect(res.body).to.not.have.property("password")
            expect(res.body).to.have.property("username", "Utilisateur inconnu")
        })
    })

    it("Tentative injection SQL", () => {
        login(tentativeInjectionSQL, res => {
            expect(res.body).to.not.have.property("username")
            expect(res.body).to.have.property(
                "password",
                "Mauvais mot de passe"
            )
        })
    })

    it("Valeurs longues", () => {
        login(longValues, res => {
            expect(res.body).to.not.have.property("password")
            expect(res.body).to.have.property("username", "Utilisateur inconnu")
        })
    })

    it("Bons identifiants", () => loginAsCreateur())
})
