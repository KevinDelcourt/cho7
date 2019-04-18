import reset_db from "../utils/reset_db"
import { beginAndLoginAsCreateur } from "../utils/web/authentification"
import {
    goToRenseignerProfilPage,
    goToMesCreations,
    goToAccueilBouton,
    goToAccueilImage,
    goToDeconnexion
} from "../utils/web/navigation"

before(() => reset_db())

describe("composant header", () => {
    it("navigation du point de vue du créateur", () => {
        beginAndLoginAsCreateur()

        goToRenseignerProfilPage()

        goToMesCreations()

        goToAccueilImage()

        goToAccueilBouton()

        goToDeconnexion()
    })
})
