import getApiUrl from '../../../src/modules/apiURL'

export const getRequest = (url,cb) =>
    cy.request(getApiUrl()+url).then((res)=>{
        expect(res.headers['content-type']).to.include('application/json')
        if(cb)
            cb(res)
    })

export const postRequest = (url,data,cb) => 
    cy.request('POST',getApiUrl()+url,data).then((res)=>{
        expect(res.headers['content-type']).to.include('application/json')
        if(cb)
            cb(res)
    })