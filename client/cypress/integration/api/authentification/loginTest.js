import { longString } from "../../../utils/functions"
import {
    login,
    loginAsCreateur,
    testBadLogin
} from "../../../utils/api/authentification"
import reset_db from "../../../utils/reset_db"

before(() => reset_db())

describe("/login", () => {
    it("Mauvais mot de passe ne marche pas", () => {
        login(
            {
                username: "Admin",
                password: "ab"
            },
            testBadLogin
        )
    })

    it("Mauvais nom utilisateur ne marche pas", () => {
        login(
            {
                username: "d",
                password: "Admin"
            },
            testBadLogin
        )
    })

    it("Tentative injection SQL ne marche pas", () => {
        login(
            {
                username: "a' OR 1 LIKE 1;",
                password: "Admin"
            },
            testBadLogin
        )
    })

    it("Valeurs longues", () => {
        login(
            {
                username: longString(51),
                password: longString(65)
            },
            testBadLogin
        )
    })

    it("Bons identifiants", () => loginAsCreateur())
})
