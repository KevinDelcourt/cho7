const { body, check, validationResult } = require("express-validator/check")

const maxLenTab = {
    username: 50,
    password: 64,
    email: 254,
    presentation: 512,
    titre: 50,
    description: 2048
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

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) return next()

    return res.send(false)
}

const hasGoodId = (req, res, next) => {
    if ("" + req.user.id === req.params.id) return next()
    return res.send(false)
}

const newUserValidator = [
    requiredCheck("username", "Pseudo requis"),
    requiredCheck("password", "Mot de passe requis"),
    body("email")
        .isEmail()
        .withMessage("Mail valide requis")
]

const userUpdateValidator = [
    requiredCheck("username", "Pseudo requis"),
    body("email")
        .isEmail()
        .withMessage("Mail valide requis")
]

const creationValidator = [
    body("titre")
        .isLength({ min: 1 })
        .withMessage("Titre requis"),
    body("creation")
        .custom((value, { req }) => {
            if (req.file && req.file.mimetype.split("/")[0] != "audio")
                throw new Error("Seuls les fichiers audios sont acceptés")
            return true
        })
        .custom((value, { req }) => {
            if (req.file && req.file.originalname.length > 50)
                throw new Error(
                    "Nom de fichier trop long, maximum 50 caractères"
                )
            return true
        })
]

const etatAvancementValidator = [
    body("libelle.*")
        .isString()
        .isLength({ min: 1 })
        .withMessage("Le label de l'état est obligatoire")
        .isLength({ max: 50 })
        .withMessage("Le titre doit faire un maximum de 50 caractères"),
    body("idEtat.*").isInt({
        min: 0,
        max: 99999999999
    })
]

const validator = {
    responseFromValidatorError,
    getErrors,
    hasNoErrors,
    maxLenCheck,
    requiredCheck,
    maxLenValidator,
    isLoggedIn,
    hasGoodId,
    newUserValidator,
    userUpdateValidator,
    creationValidator,
    etatAvancementValidator
}

module.exports = validator
