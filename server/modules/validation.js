const { body, check, validationResult } = require("express-validator/check")

const maxLenTab = {
    username: 50,
    password: 64,
    email: 254,
    presentation: 512
}

const responseFromValidatorError = error => {
    let response = {}
    for (let val of error.array()) response[val.param] = val.msg
    return response
}

const getErrors = req => {
    return responseFromValidatorError(validationResult(req))
}

const hasNoErrors = (req, res, next) => {
    let errors = getErrors(req)
    if (JSON.stringify(errors) !== "{}") return res.send(errors)

    return next()
}

const maxLenCheck = (propName, maxLen) =>
    body(propName)
        .isLength({ max: maxLen })
        .withMessage("Trop long")

const requiredCheck = (propName, msg) =>
    body(propName)
        .isLength({ min: 1 })
        .withMessage(msg)

const maxLenValidator = () => {
    let tab = []
    for (let key in maxLenTab) tab.push(maxLenCheck(key, maxLenTab[key]))
    return tab
}

module.exports = {
    responseFromValidatorError,
    getErrors,
    hasNoErrors,
    maxLenCheck,
    requiredCheck,
    maxLenValidator
}
