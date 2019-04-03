import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"
import Label from "./Label"
import theme from "../../../theme.json"

test("Label font renders correctly", () => {
    const tree = renderer
        .create(<Label font={theme.fontFamily.ruluko} />)
        .toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule("font-family", "Ruluko")
})
