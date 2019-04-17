const connection = require("mysql").createConnection(
    require("../db/db-identifiants.json")
)

const {
    uploadAudio,
    uploadImageProfile,
    uploadImageTheme
} = require("../modules/multer")

const validators = require("../modules/validation")
const mainController = require("./controllers/main")(connection)
const creationController = require("./controllers/creation")(connection)
const themeController = require("./controllers/theme")(connection)
const userController = require("./controllers/users")(connection)
const authController = require("./controllers/auth")()

module.exports = (app, passport) => {
    app.get("/", mainController.accueil)

    app.post(
        "/addcreation",
        validators.isLoggedIn,
        uploadAudio.single("creation"),
        validators.creationValidator,
        validators.etatAvancementValidator,
        validators.maxLenValidator(),
        validators.hasNoErrors,
        creationController.addCreation
    )

    app.post(
        "/updateCreation/",
        validators.isLoggedIn,
        uploadAudio.single("creation"),
        validators.creationValidator,
        validators.maxLenValidator(),
        validators.hasNoErrors,
        creationController.updateCreation
    )

    app.get(
        "/deleteCreation/:id",
        validators.isLoggedIn,
        creationController.deleteCreation
    )

    app.post("/StarRating/:id", mainController.addNote)

    app.post("/cptEcoute", mainController.addEcoute)

    app.get("/theme", themeController.getTheme)

    app.post(
        "/theme",
        validators.isLoggedIn,
        uploadImageTheme.fields([
            { name: "logoFile", maxCount: 1 },
            { name: "banniereFile", maxCount: 1 },
            { name: "backgroundFile", maxCount: 1 }
        ]),
        themeController.updateTheme
    )

    app.get("/user", validators.isLoggedIn, userController.getLoggedInUser)

    app.get("/users", userController.getUsers)

    app.post(
        "/users",
        validators.newUserValidator,
        validators.maxLenValidator(),
        validators.hasNoErrors,
        userController.createNewUser
    )

    app.get("/users/:id", userController.getUserFromId)

    app.delete(
        "/users/:id",
        validators.isLoggedIn,
        validators.hasGoodId,
        userController.deleteUser
    )

    app.post(
        "/users/:id",
        validators.isLoggedIn,
        validators.hasGoodId,
        uploadImageProfile.single("fichierAvatar"),
        validators.userUpdateValidator,
        validators.maxLenValidator(),
        validators.hasNoErrors,
        userController.updateUser
    )

    app.get("/createur", userController.getCreateur)

    app.get("/creation/:id", creationController.getCreation)

    app.get(
        "/creations/done/plusecoutes",
        creationController.getCreationsPlusEcoutees
    )

    app.get(
        "/creations/done",
        creationController.getCreationDuPlusAuMoinsRecent
    )

    app.get("/creations/inprogress", creationController.getCreationEnCours)

    app.get("/avancement", creationController.getAvancement)

    app.get(
        "/etatsCreation/:idCreation",
        creationController.getEtatFromCreationId
    )

    app.get(
        "/has_role/:role",
        validators.isLoggedIn,
        authController.userHasRole
    )

    app.post(
        "/login",
        passport.authenticate("local", { failureRedirect: "/denied" }),
        authController.loginAction
    )

    app.get("/logout", authController.logoutAction)

    app.get("/denied", mainController.denied)
}
