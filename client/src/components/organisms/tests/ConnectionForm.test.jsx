import renderer from "react-test-renderer"
import "jest-styled-components"
import ConnectionForm from "../ConnectionForm"
import testEnv from "../../../modules/jestUtil"

test("renders without crashing", () => {
    const tree = renderer.create(testEnv(ConnectionForm)).toJSON()
})
