import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"
import Container from "./Container"
import theme from "../../../theme.json"

test("Container background-color renders correctly", () => {
    const tree = renderer
        .create(<Container bgColor={theme.color.brown1} />)
        .toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule("background-color", "rgba(145,109,67,0.35)")
})

test("Container color renders correctly", () => {
    const tree = renderer.create(<Container color={theme.color.white} />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule("color", "#fff")
})

test("Container border renders correctly", () => {
    const tree = renderer.create(<Container />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule("border", "none")
})
