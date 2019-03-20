import { getCreateur , getUtilisateurConnecte, postProfilCreateur } from '../../../utils/api/createur'
import { loginAsCreateur, logout, login } from '../../../utils/api/authentification'
import { neMarchePasSiPasConnecte } from '../../../utils/api/index'
import { longString } from '../../../utils/functions'
import reset_db from '../../../utils/reset_db'
before(()=>reset_db())

const expectedCreateur = {
    "id": 1,
    "username": "Admin",
    "email": "",
    "presentation": null,
    "avatar": "avatar_createur.png",
    "role": "ROLE_CREATEUR"
}

describe('accéder au profil',()=>{
    it('Accède au profil du créateur sans son mot de passe',()=>{
        getCreateur((res)=>{
            expect(res.body).to.eql(expectedCreateur)
        })
    })

    it("ne peut pas renvoyer le profil du créateur si il n'est pas connecté",()=>{
        logout()
        getUtilisateurConnecte((res)=>{
            expect(res.body).to.be.false
        })
    })

    it("peut renvoyer le profil du créateur si il est connecté", ()=>{
        loginAsCreateur()
        getUtilisateurConnecte((res)=>{
            expect(res.body).to.eql(expectedCreateur)
        })
    })
})

describe('modifier le profil',()=>{
    beforeEach(()=>reset_db())

    after(()=>reset_db())

    neMarchePasSiPasConnecte((cb)=>postProfilCreateur({username:"Admin", password:"Admin", email:"a"},cb))

    it('ne modifie pas le mot de passe si pas dans la requête', ()=>{
        loginAsCreateur()
        postProfilCreateur({username:"a",email:"abc"},(res)=>{
            expect(res.body).to.be.true
        })
        logout()
        login({username:"a",password:"Admin"},(res)=>{
            expect(res.body).to.include('s:')
        })
    })

    it('peut modifier le profil',()=>{
        loginAsCreateur()
        postProfilCreateur({username:"paul", password:"abal",email:"truc@gmail.com"},(res)=>{
            expect(res.body).to.be.true
        })
        logout()
        getCreateur((res)=>{
            expect(res.body).to.have.property('username',"paul")
            expect(res.body).to.have.property('email','truc@gmail.com')
        })
    })

    it('erreur si pas de mail/username',()=>{
        loginAsCreateur()
        postProfilCreateur({email:"truc"},(res)=>{
            expect(res.body).to.have.property('username','Pseudo requis')
        })
        postProfilCreateur({username:"truc",password:"truc"},(res)=>{
            expect(res.body).to.have.property('email','Mail requis')
        })
    })

    it('renvoie des erreurs en cas de chaines trop longues',()=>{
        loginAsCreateur()
        postProfilCreateur({username: longString(51)},(res)=>{
            expect(res.body).to.have.property('username','Trop long')
        })
        postProfilCreateur({password: longString(65)},(res)=>{
            expect(res.body).to.have.property('password','Trop long')
        })
        postProfilCreateur({email: longString(255)},(res)=>{
            expect(res.body).to.have.property('email','Trop long')
        })
        postProfilCreateur({presentation: longString(513)},(res)=>{
            expect(res.body).to.have.property('presentation','Trop long')
        })
    })
})
