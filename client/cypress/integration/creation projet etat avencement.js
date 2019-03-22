import reset_db from "../utils/reset_db"
before(() => reset_db())



//ok donc le plan ici c'est de tester
//  creation de projet normal
//  creation de projet sans eta d'avencement
//  creation de projet vide
//  et non on ne testeras pas de projet avec un vrai fichier son


describe('composant creation de projet', () => {
/*
                     _   _                   _                        _      _                                      _ 
  ___ _ __ ___  __ _| |_(_) ___  _ __     __| | ___   _ __  _ __ ___ (_) ___| |_   _ __   ___  _ __ _ __ ___   __ _| |
 / __| '__/ _ \/ _` | __| |/ _ \| '_ \   / _` |/ _ \ | '_ \| '__/ _ \| |/ _ \ __| | '_ \ / _ \| '__| '_ ` _ \ / _` | |
| (__| | |  __/ (_| | |_| | (_) | | | | | (_| |  __/ | |_) | | | (_) | |  __/ |_  | | | | (_) | |  | | | | | | (_| | |
 \___|_|  \___|\__,_|\__|_|\___/|_| |_|  \__,_|\___| | .__/|_|  \___// |\___|\__| |_| |_|\___/|_|  |_| |_| |_|\__,_|_|
                                                     |_|           |__/                                               
*/

    it('je teste le creation de projet normal', () => {
        cy.visit('http://localhost:3000/')
        cy.get(':nth-child(2) > a > .sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/login')


    cy.log('cilck et ajout de l\'username')

        //si lui ne passe pas , essayer de changer le get (aller dans cypress puis cliquer 
        //sur le champ de texte et copier le lien du get généré)

        cy.get(':nth-child(2) > .sc-htpNat').type('Admin')


    cy.log('cilck et ajout du mdp')
        cy.get(':nth-child(4) > .sc-htpNat').type('Admin')


    cy.log('cilck pour la connexion')
        cy.get('.sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/')


        cy.log('cilck sur la creation')
    cy.get('[href="/creations"] > .sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/creations')

        cy.log('cilck sur la nouvelle creation')
        cy.get('.sc-gPEVay > :nth-child(1) > center > a').click()
        cy.url().should('eq', 'http://localhost:3000/newCreation')


        cy.log('entrention des données')
        cy.get('.sc-hSdWYo > .sc-iAyFgw').type('la fureur du posti-it III')
        cy.get('#inputStateName').type('posti\-it endoctriner')
        cy.get('.sc-eHgmQL').type('c\'est l\'histoire d\'un posti-it qui tombe amoureux d\'une aluméte ... mais les choses vont tres vite se compliqué et notre posti-it devras s\'en sortir face au démonique cisax')


        cy.log('ajout de l\'eta d\'avencement et validation')
        cy.get('.sc-jWBwVP').click()
        cy.get('.sc-cMljjf > .sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/')

    })


/*

                     _   _                   _                        _      _                                _        
  ___ _ __ ___  __ _| |_(_) ___  _ __     __| | ___   _ __  _ __ ___ (_) ___| |_   ___  __ _ _ __  ___    ___| |_ __ _ 
 / __| '__/ _ \/ _` | __| |/ _ \| '_ \   / _` |/ _ \ | '_ \| '__/ _ \| |/ _ \ __| / __|/ _` | '_ \/ __|  / _ \ __/ _` |
| (__| | |  __/ (_| | |_| | (_) | | | | | (_| |  __/ | |_) | | | (_) | |  __/ |_  \__ \ (_| | | | \__ \ |  __/ || (_| |
 \___|_|  \___|\__,_|\__|_|\___/|_| |_|  \__,_|\___| | .__/|_|  \___// |\___|\__| |___/\__,_|_| |_|___/  \___|\__\__,_|
                                                     |_|           |__/                                                
     _ _                                                     _   
  __| ( ) __ ___   _____ _ __   ___ ___ _ __ ___   ___ _ __ | |_ 
 / _` |/ / _` \ \ / / _ \ '_ \ / __/ _ \ '_ ` _ \ / _ \ '_ \| __|
| (_| | | (_| |\ V /  __/ | | | (_|  __/ | | | | |  __/ | | | |_ 
 \__,_|  \__,_| \_/ \___|_| |_|\___\___|_| |_| |_|\___|_| |_|\__|


*/

    it('je teste le creation de projet sans eta d\'avencement', () => {
        cy.visit('http://localhost:3000/')
        cy.get(':nth-child(2) > a > .sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/login')


        cy.log('cilck et ajout de l\'username')

        cy.get(':nth-child(2) > .sc-htpNat').type('Admin')


        cy.log('cilck et ajout du mdp')
        cy.get(':nth-child(4) > .sc-htpNat').type('Admin')


        cy.log('cilck pour la connexion')
        cy.get('.sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/')


        cy.log('cilck sur la creation')
        cy.get('[href="/creations"] > .sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/creations')

        cy.log('cilck sur la nouvelle creation')
        cy.get('.sc-gPEVay > :nth-child(1) > center > a').click()
        cy.url().should('eq', 'http://localhost:3000/newCreation')


        cy.log('entrention des données')
        cy.get('.sc-hSdWYo > .sc-iAyFgw').type('posti-it infinity war')
        cy.get('.sc-eHgmQL').type('les posti-it s\'unissent contre le nouveau méchant a la mode pour le vaincre, von\'til s\'en sortir contre scotchator 2000 ?')


        cy.log('et validation')
        cy.get('.sc-cMljjf > .sc-EHOje').click()
        cy.url().should('eq', 'http://localhost:3000/')
    })
    
/*

                     _   _                   _                        _      _           _     _      
  ___ _ __ ___  __ _| |_(_) ___  _ __     __| | ___   _ __  _ __ ___ (_) ___| |_  __   _(_) __| | ___ 
 / __| '__/ _ \/ _` | __| |/ _ \| '_ \   / _` |/ _ \ | '_ \| '__/ _ \| |/ _ \ __| \ \ / / |/ _` |/ _ \
| (__| | |  __/ (_| | |_| | (_) | | | | | (_| |  __/ | |_) | | | (_) | |  __/ |_   \ V /| | (_| |  __/
 \___|_|  \___|\__,_|\__|_|\___/|_| |_|  \__,_|\___| | .__/|_|  \___// |\___|\__|   \_/ |_|\__,_|\___|
                                                     |_|           |__/                               


*/



it('je teste le creation de projet vide', () => {
    cy.visit('http://localhost:3000/')
    cy.get(':nth-child(2) > a > .sc-EHOje').click()
    cy.url().should('eq', 'http://localhost:3000/login')


    cy.log('cilck et ajout de l\'username')

    cy.get(':nth-child(2) > .sc-htpNat').type('Admin')


    cy.log('cilck et ajout du mdp')
    cy.get(':nth-child(4) > .sc-htpNat').type('Admin')


    cy.log('cilck pour la connexion')
    cy.get('.sc-EHOje').click()
    cy.url().should('eq', 'http://localhost:3000/')


    cy.log('cilck sur la creation')
    cy.get('[href="/creations"] > .sc-EHOje').click()
    cy.url().should('eq', 'http://localhost:3000/creations')

    cy.log('cilck sur la nouvelle creation')
    cy.get('.sc-gPEVay > :nth-child(1) > center > a').click()
    cy.url().should('eq', 'http://localhost:3000/newCreation')

    cy.log('validation')
    cy.get('.sc-cMljjf > .sc-EHOje').click()
    cy.url().should('eq', 'http://localhost:3000/')
})





















































































})