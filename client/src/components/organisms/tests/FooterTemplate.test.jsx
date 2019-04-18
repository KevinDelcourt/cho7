import renderer from "react-test-renderer"
import "jest-styled-components"
import FooterTemplate from "../FooterTemplate"
import testEnv from "../../../modules/jestUtil"

test("renders without crashing", () => {
    const tree = renderer.create(testEnv(FooterTemplate)).toJSON()
})
