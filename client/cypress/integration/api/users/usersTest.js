import {
    getCreateur,
    getUtilisateurConnecte,
    postProfilCreateur
} from "../../../utils/api/createur"
import {
    getUsers,
    getUserFromId,
    postNewUser,
    deleteUser,
    postUserUpdate
} from "../../../utils/api/users"
import {
    loginAsCreateur,
    logout,
    login
} from "../../../utils/api/authentification"
import {
    neMarchePasSiPasConnecte,
    erreurSiValeurTropLongue,
    erreurSi
} from "../../../utils/api/index"
import { longString } from "../../../utils/functions"
import reset_db from "../../../utils/reset_db"

const expectedCreateur = {
    id: 1,
    username: "Admin",
    email: "artiste.art@genie.nl",
    presentation: "Je suis un artiste et je fait de l'art de génie",
    avatar: "avatar_createur.png",
    role: "ROLE_CREATEUR"
}
before(() => reset_db())

describe("get users", () => {
    it("retourne la liste des utilisateurs sans les mots de passe", () => {
        getUsers(res => {
            expect(res.body.length).to.eql(1)
        })
    })
})

describe("get user from id", () => {
    it("Ne retourne rien si pas numérique", () => {
        getUserFromId("abc", res => {
            expect(res.body).to.be.false
        })
    })

    it("Peux retourner un user avec son id", () => {
        getUserFromId(1, res => {
            expect(res.body).to.eql(expectedCreateur)
        })
    })

    it("Ne retourne rien si pas d'utilisateur avec l'id en question", () => {
        getUserFromId(8, res => {
            expect(res.body).to.be.false
        })
    })
})

describe("create User", () => {
    beforeEach(() => reset_db())

    erreurSi(
        "pas de username",
        cb => postNewUser({ password: "abc", email: "a@b.fr" }, cb),
        { username: "Pseudo requis" }
    )

    erreurSi(
        "pas de password",
        cb => postNewUser({ username: "abc", email: "a@b.fr" }, cb),
        { password: "Mot de passe requis" }
    )

    erreurSi(
        "pas d'email",
        cb => postNewUser({ password: "abc", password: "a@b.fr" }, cb),
        { email: "Mail valide requis" }
    )

    erreurSi(
        "pas d'email valide",
        cb =>
            postNewUser(
                { password: "abc", password: "a@b.fr", email: "abc" },
                cb
            ),
        { email: "Mail valide requis" }
    )

    erreurSiValeurTropLongue("username", cb =>
        postNewUser({ username: longString(51) }, cb)
    )

    erreurSiValeurTropLongue("password", cb =>
        postNewUser({ password: longString(65) }, cb)
    )

    erreurSiValeurTropLongue("email", cb =>
        postNewUser({ email: longString(255) }, cb)
    )

    it("Peut créer un nouveau user", () => {
        postNewUser(
            { username: "abc", password: "abc", email: "abc@def.gh" },
            res => {
                expect(res.body).to.be.true
                login({ username: "abc", password: "abc" }, res => {
                    expect(res.body).to.include("s:")
                })
            }
        )
    })
})

describe("delete user", () => {
    beforeEach(() => reset_db())

    afterEach(() => logout())

    neMarchePasSiPasConnecte(cb => deleteUser(1, cb))

    it("Ne marche pas si pas connecté avec le bon profil", () => {
        login({ username: "Admin", password: "Admin" })
        deleteUser(2, res => {
            expect(res.body).to.be.false
        })
    })

    it("Peut supprimer un user", () => {
        postNewUser(
            { username: "abc", password: "abc", email: "abc@def.gh" },
            res => {
                expect(res.body).to.be.true
            }
        )
        login({ username: "abc", password: "abc" }, res => {
            expect(res.body).to.include("s:")
        })
        getUserFromId(2, res => {
            expect(res.body).to.have.property("username", "abc")
        })
        deleteUser(2, res => {
            expect(res.body).to.be.true
        })
        getUserFromId(2, res => {
            expect(res.body).to.be.false
        })
    })
})

describe("update user", () => {
    beforeEach(() => {
        reset_db()
        loginAsCreateur()
    })

    afterEach(() => logout())

    neMarchePasSiPasConnecte(cb => postUserUpdate(1, {}, cb))

    it("Ne marche pas si pas connecté avec le bon profil", () => {
        postUserUpdate(2, {}, res => {
            expect(res.body).to.be.false
        })
    })

    erreurSi(
        "pas de username",
        cb => postUserUpdate(1, { password: "abc" }, cb),
        { username: "Pseudo requis" }
    )

    erreurSi(
        "pas d'email",
        cb => postUserUpdate(1, { username: "abc", password: "abc" }, cb),
        { email: "Mail valide requis" }
    )

    erreurSi(
        "pas d'email valide",
        cb => postUserUpdate(1, { username: "abc", email: "abc" }, cb),
        { email: "Mail valide requis" }
    )

    erreurSiValeurTropLongue("username", cb =>
        postUserUpdate(1, { username: longString(51) }, cb)
    )

    erreurSiValeurTropLongue("password", cb =>
        postUserUpdate(1, { password: longString(65) }, cb)
    )

    erreurSiValeurTropLongue("email", cb =>
        postUserUpdate(1, { email: longString(255) }, cb)
    )

    erreurSiValeurTropLongue("presentation", cb =>
        postUserUpdate(1, { presentation: longString(513) }, cb)
    )

    it("Peut modifier un profil", () => {
        postUserUpdate(
            1,
            { username: "a", email: "bb@cc.dd", presentation: "e" },
            res => {
                expect(res.body).to.be.true
            }
        )
        getUserFromId(1, res => {
            expect(res.body).to.have.property("username", "a")
            expect(res.body).to.have.property("email", "bb@cc.dd")
            expect(res.body).to.have.property("presentation", "e")
        })
    })
})
