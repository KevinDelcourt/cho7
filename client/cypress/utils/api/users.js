import {
    getRequest,
    postRequest,
    expectToHaveProperties,
    deleteRequest
} from "./index"

export const getUsers = cb =>
    getRequest("/users", res => {
        for (let row of res.body) {
            expect(row).not.to.have.property("password")
            expectToHaveProperties(row, [
                "id",
                "username",
                "email",
                "avatar",
                "presentation",
                "role"
            ])
        }
        cb(res)
    })

export const getUserFromId = (id, cb) => getRequest("/users/" + id, cb)

export const postUserUpdate = (id, data, cb) =>
    postRequest("/users/" + id, data, cb)

export const deleteUser = (id, cb) => deleteRequest("/users/" + id, cb)

export const postNewUser = (data, cb) => postRequest("/users", data, cb)
