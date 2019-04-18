import renderer from "react-test-renderer"
import "jest-styled-components"
import BarreMenu from "../BarreMenu"
import testEnv from "../../../modules/jestUtil"

test("renders without crashing", () => {
    const tree = renderer.create(testEnv(BarreMenu)).toJSON()
})
