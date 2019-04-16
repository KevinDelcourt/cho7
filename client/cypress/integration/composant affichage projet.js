import reset_db from "../utils/reset_db"
import { beginAndLoginAsCreateur } from "../utils/web/authentification"
import { goToMesCreations, goToModification } from "../utils/web/navigation"
import { ModifierCreation } from "../utils/web/creation"

describe("composant affichage projet", () => {
    before(() => reset_db())
    it("je teste le composant affichage projet", () => {
        beginAndLoginAsCreateur()
        goToMesCreations()

        goToModification()

        ModifierCreation()
    })
})
