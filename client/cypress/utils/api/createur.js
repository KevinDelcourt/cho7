import { getRequest, postRequest } from "./index"

export const getCreateur = cb => getRequest("/createur", cb)

export const getUtilisateurConnecte = cb => getRequest("/user", cb)

export const postProfilCreateur = (formdata, cb) =>
    postRequest("/renseignerprofil", formdata, cb)
