import renderer from "react-test-renderer"
import "jest-styled-components"
import MesCreationsPage from "../MesCreationsPage"
import testEnv from "../../../modules/jestUtil"

test("renders without crashing", () => {
    const tree = renderer.create(testEnv(MesCreationsPage)).toJSON()
})
