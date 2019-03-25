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

test("Button color renders correctly", () => {
    const tree = renderer
      .create(<Button color={theme.color.white} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule("color", "#fff");
  });

test("Button border renders correctly", () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree).toHaveStyleRule("border", "none");
});

//affichage deconnexion/connexion

//affichage, disparition boutons du menu

//modification du thème des boutons selon le créateur
