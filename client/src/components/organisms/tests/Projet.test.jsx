import renderer from "react-test-renderer"
import "jest-styled-components"
import Projet from "../Projet"
import testEnv from "../../../modules/jestUtil"

test("renders without crashing", () => {
    const tree = renderer.create(testEnv(Projet)).toJSON()
})
