import { getCreateur } from '../../../utils/api/createur'
import reset_db from '../../../utils/reset_db'

before(()=>reset_db())

it('Accède au profil du créateur sans son mot de passe',()=>{
    getCreateur((res)=>{
        expect(res.body).to.eql({
            "id": 1,
            "username": "Admin",
            "email": "",
            "presentation": null,
            "avatar": "avatar_createur.png",
            "role": "ROLE_CREATEUR"
        })
    })
})