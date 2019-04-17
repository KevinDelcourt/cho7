import React from "react"
import { storiesOf } from "@storybook/react"
import { withKnobs, text, number } from "@storybook/addon-knobs"
import Button from "../components/atoms/Button/Button"
import Label from "../components/atoms/Label/Label"
import Container from "../components/atoms/Container/Container"
import Title from "../components/atoms/Title/Title"
import LabelInput from "../components/molecules/LabelInput"
import UploadForm from "../components/organisms/UploadForm"
import BarreMenu from "../components/molecules/BarreMenu"
import { BrowserRouter as Router } from "react-router-dom"
import FooterTemplate from "../components/organisms/FooterTemplate"
import Input from "../components/atoms/Input/Input"
import Textarea from "../components/atoms/Textarea"
import LabelTextarea from "../components/molecules/LabelTextarea"
import MainContainer from "../components/molecules/MainContainer"
import LabelInputRange from "./../components/molecules/LabelInputRange"

const storyButton = storiesOf("atoms", module)
storyButton.addDecorator(withKnobs)
storyButton.add("Button", () => (
    <Button
        bgColor={text("Background-Color", "#ef7513")}
        children={text("Value", "Se connecter")}
        border={text("Border", "1px solid #af540c")}
        color={text("Color", "#fff")}
    />
))

const storyLabel = storiesOf("atoms", module)
storyLabel.addDecorator(withKnobs)
storyLabel.add("Label", () => (
    <Label
        font={text("Font-family", "Ruluko")}
        color={text("Font-color", "red")}
        children={text("Label children", "Intitulé")}
    />
))

const storyInput = storiesOf("atoms", module)
storyInput.addDecorator(withKnobs)
storyInput.add("Input", () => (
    <Input
        borderRadius={text("Border-radius", "30px")}
        value={text(
            "Label children",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm"
        )}
    />
))

const storyTextarea = storiesOf("atoms", module)
storyTextarea.addDecorator(withKnobs)
storyTextarea.add("Textarea", () => (
    <Textarea
        borderRadius={text("Border-radius", "30px")}
        value={text(
            "Label children",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim."
        )}
        rows="5"
    />
))

const storyContainer = storiesOf("atoms", module)
storyContainer.addDecorator(withKnobs)
storyContainer.add("Container", () => (
    <Container
        bgColor={text("BgColor", "green")}
        borderRadius={text("Border-radius", "30px")}
        boxShadow={text("BoxShadow", "0px 4px 3px rgba(0,0,0,0.9)")}
        width={text("Width", "70px")}
        children={text(
            "Content",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim."
        )}
    />
))

const storyTitle = storiesOf("atoms", module)
storyTitle.addDecorator(withKnobs)
storyTitle.add("Title", () => (
    <Title
        size={text("Size", "40px")}
        font={text("Font", "Arial")}
        color={text("Color", "blue")}
        children={text("Value", "Lorem ipsum dolor sit amet.")}
    />
))

const storyMainContainer = storiesOf("molecules", module)
const child = [
    <div style={{ backgroundColor: "none" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
    </div>
]
storyMainContainer.addDecorator(withKnobs)
storyMainContainer.add("MainContainer", () => (
    <MainContainer
        title={text("titre", "MonTitre")}
        bgColor={text("background-color", "yellow")}
        borderRadius={text("border-radius", "30px")}
        border={text("border", "dashed")}
        boxShadow={text("border-shadow", "0px 4px 40px rgba(0,0,0,0.5)")}
        width={text("width", "450px")}
        children={text("content", child)}
    />
))

const storyLabelInput = storiesOf("molecules", module)
storyLabelInput.addDecorator(withKnobs)
storyLabelInput.add("Label Input", () => (
    <LabelInput
        label={text("Label", "myLabel")}
        input={text("Input", "myInput")}
    />
))

const storyBarreMenu = storiesOf("molecules", module)
storyBarreMenu.addDecorator(withKnobs)
storyBarreMenu.add("Barre de Menu", () => (
    <Router>
        <BarreMenu />
    </Router>
))

storiesOf("organisms", module)
    .addDecorator(withKnobs)
    .add("Footer", () => (
        <FooterTemplate
            left={text("Gauche", "gaute")}
            right={text("Droite", "droiche")}
        />
    ))
    .add("UploadForm", () => <UploadForm />)

const storyLabelTextarea = storiesOf("molecules", module)
storyLabelTextarea.addDecorator(withKnobs)
storyLabelTextarea.add("LabelTextarea", () => (
    <LabelTextarea
        label={text("Label value", "")}
        row={number("row", 5)}
        col={number("col", 5)}
    />
))

const storyLabelInputRange = storiesOf("molecules/LabelInputRange", module)
storyLabelInputRange.add("LabelInputRange", () => <LabelInputRange />)
