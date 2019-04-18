import renderer from "react-test-renderer"
import "jest-styled-components"
import Profile from "../Profile"
import testEnv from "../../../modules/jestUtil"

test("renders without crashing", () => {
    const tree = renderer.create(testEnv(Profile)).toJSON()
})
