import { getCreation, getEtatsAvancement, postNewCreation, postUpdateCreation } from '../../../utils/api/creation'
import reset_db from '../../../utils/reset_db'
import { longString } from '../../../utils/functions'
import { neMarchePasSiPasConnecte } from '../../../utils/api/index'

const newCreation = {
    titre: "test",
    libelle: ["a1","a2"],
    valeur: [10,30]
}

describe('upload creation sans fichier',()=>{
    beforeEach(()=>reset_db())    

    neMarchePasSiPasConnecte((cb)=>postNewCreation(newCreation,cb))

    it('erreur si pas de titre',()=>{
        let creation = {
            libelle: ["a1","a2"],
            valeur: [10,30]
        }
        postNewCreation(creation,(res)=>{
            expect(res.body).to.have.property('titre','Titre requis')
        })
    })

    it('erreur si pas de libelle ou de valeur',()=>{
        let creation = {...newCreation,libelle: []}
        postNewCreation(creation,(res)=>{
            expect(res.body).to.have.property('libelle','Au moins 1 etat requis')
        })
        creation = {...newCreation,valeur: []}
        postNewCreation(creation,(res)=>{
            expect(res.body).to.have.property('valeur','Au moins 1 valeur requise')
        })
    })

    it('erreur si titre ou etat trop long',()=>{
        let creation = {...newCreation, titre: longString(51)}
        postNewCreation(creation,(res)=>{
            expect(res.body).to.have.property('titre','Trop long')
        })

        creation = {...newCreation, valeur: [longString(51),"oui"]}
        postNewCreation(creation,(res)=>{
            expect(res.body).to.have.property('valeur','Trop long')
        })
    })

    it('peut ajouter une création',()=>{
        postNewCreation(newCreation,(res)=>{
            expect(res.body).to.be.true
        })
        getCreation(5,(res)=>{
            expect(res.body).to.have.property('titre','test')
        })
    })
})

const updateCreationFinie = {
    id: 1,
    titre: "test",
    description: "bla bla bla"
}

const updateCreationEnCours = {
    id: 2,
    titre: "pas fini",
    description: "bla bla bla",
    libelle: ['a','b'],
    valeur: [10,20],
    idEtat: [1,2]
}

describe('update creation sans fichier',()=>{
    beforeEach(()=>reset_db())

    neMarchePasSiPasConnecte((cb)=>postUpdateCreation(updateCreationFinie,cb))

    it('peut modifier une création finie',()=>{
        postUpdateCreation(updateCreationFinie,(res)=>{
            expect(res.body).to.be.true
        })
        getCreation(1,(res)=>{
            expect(res.body).to.have.property('titre','test')
            expect(res.body).to.have.property('description','bla bla bla')
        })
    })

    it('peut modifier une création en cours',()=>{
        postUpdateCreation(updateCreationEnCours,(res)=>{
            expect(res.body).to.be.true
        })
        getCreation(2,(res)=>{
            expect(res.body).to.have.property('titre','pas fini')
            expect(res.body).to.have.property('description','bla bla bla')
        })
        getEtatsAvancement(2,(res)=>{
            expect(res.body.length).to.eql(2)
            expect(res.body[0]).to.have.property("libelle","a")
            expect(res.body[1]).to.have.property("valeuravancement",20)
        })
    })

    it('erreur si pas de titre',()=>{
        let creation = {
            id: 2,
            description: "bla bla bla",
            libelle: ['a','b'],
            valeur: [10,20],
            idEtat: [1,2]
        }
        postUpdateCreation(creation,(res)=>{
            expect(res.body).to.have.property('titre','Titre requis')
        })
    })

    it('erreur si titre ou etat trop long',()=>{
        let creation = {...updateCreationEnCours, titre: longString(51)}
        postUpdateCreation(creation,(res)=>{
            expect(res.body).to.have.property('titre','Trop long')
        })

        creation = {...updateCreationEnCours, valeur: [longString(51),"oui"]}
        postUpdateCreation(creation,(res)=>{
            expect(res.body).to.have.property('valeur','Trop long')
        })
    })
})