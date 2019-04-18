import renderer from "react-test-renderer"
import "jest-styled-components"
import NewsFeed from "../NewsFeed"
import testEnv from "../../../modules/jestUtil"

test("renders without crashing", () => {
    const tree = renderer.create(testEnv(NewsFeed)).toJSON()
})
