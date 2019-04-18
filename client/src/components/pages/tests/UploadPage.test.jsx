import renderer from "react-test-renderer"
import "jest-styled-components"
import UploadPage from "../UploadPage"
import testEnv from "../../../modules/jestUtil"

test("renders without crashing", () => {
    const tree = renderer.create(testEnv(UploadPage)).toJSON()
})
