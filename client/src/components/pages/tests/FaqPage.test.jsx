import renderer from "react-test-renderer"
import "jest-styled-components"
import FaqPage from "../FaqPage"
import testEnv from "../../../modules/jestUtil"

test("renders without crashing", () => {
    const tree = renderer.create(testEnv(FaqPage)).toJSON()
})
