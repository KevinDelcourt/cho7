describe('Le serveur',()=>{
    before(()=>{
        cy.exec("node ../server/db/init_db.js")
    })

    it('est en ligne',()=>{
        cy.request("http://localhost:8180/").its('body').should('include','online')
    })

    it('peut refuser une requête',()=>{
        cy.request("http://localhost:8180/has_role/createur").its('body').should('include','false')
    })

    it('peut connecter un utilisateur avec les bons identifiants',()=>{
        let body = {username:"a",password:"a"}
        cy.request('POST',"http://localhost:8180/login",body)
        .then((response)=>{
            expect(response.body).to.equal(false)
        })

        body = {username:"Admin",password:"a"}
        cy.request('POST',"http://localhost:8180/login",body)
        .then((response)=>{
            expect(response.body).to.equal(false)
        })

        body = {username:"Admin",password:"Admin"}
        cy.request('POST',"http://localhost:8180/login",body).its('body').should('include','s:')
    })
})