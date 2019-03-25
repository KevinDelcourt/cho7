import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";
import Button from "./Button";
import theme from "../../../theme.json";

test("Button background-color renders correctly", () => {
  const tree = renderer
    .create(<Button bgColor={theme.color.brown1} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule("background-color", "rgba(145,109,67,0.35)");
});

test("Button border renders correctly", () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule("border", "none");
});
