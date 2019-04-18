import renderer from "react-test-renderer"
import "jest-styled-components"
import RenseignerProfilPage from "../RenseignerProfilPage"
import testEnv from "../../../modules/jestUtil"

test("renders without crashing", () => {
    const tree = renderer.create(testEnv(RenseignerProfilPage)).toJSON()
})
