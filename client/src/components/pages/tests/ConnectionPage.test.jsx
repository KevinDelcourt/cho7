import renderer from "react-test-renderer"
import "jest-styled-components"
import ConnectionPage from "../ConnectionPage"
import testEnv from "../../../modules/jestUtil"

test("renders without crashing", () => {
    const tree = renderer.create(testEnv(ConnectionPage)).toJSON()
})
