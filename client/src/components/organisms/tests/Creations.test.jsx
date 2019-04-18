import renderer from "react-test-renderer"
import "jest-styled-components"
import Creations from "../Creations"
import testEnv from "../../../modules/jestUtil"

test("renders without crashing", () => {
    const tree = renderer.create(testEnv(Creations)).toJSON()
})
