import { getRequest, postRequest, expectToHaveProperties } from "./index"

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

export const postNewUser = (data, cb) => postRequest("/users", data, cb)
