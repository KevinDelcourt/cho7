import renderer from "react-test-renderer"
import "jest-styled-components"
import HeaderTemplate from "../HeaderTemplate"
import testEnv from "../../../modules/jestUtil"

test("renders without crashing", () => {
    const tree = renderer.create(testEnv(HeaderTemplate)).toJSON()
})
