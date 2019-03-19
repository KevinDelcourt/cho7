import { getRequest, postRequest } from './index'

export const getCreateur = (cb) => getRequest('/createur',cb)