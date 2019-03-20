import {
    loginAsCreateur,
    logout,
    has_role,
    isCreateur,
    isNotCreateur
} from "../../../utils/api/authentification"
import reset_db from "../../../utils/reset_db"

before(() => reset_db())

describe("Un utilisateur non connecté", () => {
    beforeEach(() => logout())

    it("Not a truc", () => {
        has_role("truc", res => {
            expect(res.body).to.be.false
        })
    })

    it("Not a créateur", () => isNotCreateur())
})

describe("Un utilisateur connecté", () => {
    beforeEach(() => loginAsCreateur())
    afterEach(() => logout())

    it("Not a truc", () => {
        has_role("truc", res => {
            expect(res.body).to.be.false
        })
    })

    it("Est bien un créateur", () => isCreateur())
})

describe("Un scénario complet", () => {
    it("déconnexion/has_role/connexion/has_role/déconnexion/has_role", () => {
        logout()
        isNotCreateur()
        loginAsCreateur()
        isCreateur()
        logout()
        isNotCreateur()
    })
})
