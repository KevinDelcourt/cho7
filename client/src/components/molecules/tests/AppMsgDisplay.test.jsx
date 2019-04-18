import renderer from "react-test-renderer"
import "jest-styled-components"
import AppMsgDisplay from "../AppMsgDisplay"
import testEnv from "../../../modules/jestUtil"

test("renders without crashing", () => {
    const tree = renderer.create(testEnv(AppMsgDisplay)).toJSON()
})
