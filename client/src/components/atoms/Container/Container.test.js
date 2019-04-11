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

test("Container border-radius renders correctly", () => {
    const tree = renderer.create(<Container borderRadius="20px" />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule("border-radius", "20px")
})

test("Container boxShadow renders correctly", () => {
    const tree = renderer
        .create(<Container boxShadow={theme.effect.shadow} />)
        .toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule("box-shadow", "0px 4px 15px rgba(0,0,0,0.25)")
})

test("Container width renders correctly", () => {
    const tree = renderer.create(<Container width="20px" />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule("width", "20px")
})
