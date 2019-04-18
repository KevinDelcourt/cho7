import renderer from "react-test-renderer"
import "jest-styled-components"
import PersonnalisationPage from "../PersonnalisationPage"
import testEnv from "../../../modules/jestUtil"

test("renders without crashing", () => {
    const tree = renderer.create(testEnv(PersonnalisationPage)).toJSON()
})
