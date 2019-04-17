const multer = require("multer")

let uploadAudio = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + "/../public/audio/")
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
})

let uploadImageTheme = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + "/../public/images/")
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
})

let uploadImageProfile = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + "/../public/images/")
        },
        filename: (req, file, cb) => {
            cb(null, "avatar_createur." + file.originalname.split(".").pop())
        }
    })
})

module.exports = {
    uploadAudio,
    uploadImageProfile,
    uploadImageTheme
}
