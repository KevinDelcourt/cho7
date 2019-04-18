import renderer from "react-test-renderer"
import "jest-styled-components"
import AccueilPage from "../AccueilPage"
import testEnv from "../../../modules/jestUtil"

test("renders without crashing", () => {
    const tree = renderer.create(testEnv(AccueilPage)).toJSON()
})
