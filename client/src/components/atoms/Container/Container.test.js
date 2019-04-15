import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"
import Container from "./Container"
import theme from "../../../theme.json"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore, combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import { appReducer } from "../../../modules/actionsAndReducers"

const reducers = {
    form: formReducer,
    app: appReducer
}
const reducer = combineReducers(reducers)

let store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const create = component => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Route path="/" component={component} />
                </div>
            </Router>
        </Provider>
    )
}

test("Container background-color renders without crashing", () => {
    const tree = renderer.create(create(Container)).toJSON()
})

/*
test("Container background-color renders correctly", () => {
    const tree = renderer
        .create(<Container bgColor={"rgba(145,109,67,0.35)"} />)
        .toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule("background-color", "rgba(145,109,67,0.35)")
})

test("Container border-radius renders correctly", () => {
    const tree = renderer
        .create(create(<Container borderRadius="20px" />))
        .toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule("border-radius", "20px")
})

test("Container boxShadow renders correctly", () => {
    const tree = renderer
        .create(create(<Container boxShadow="0px 4px 15px rgba(0,0,0,0.25)" />))
        .toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule("box-shadow", "0px 4px 15px rgba(0,0,0,0.25)")
})

test("Container width renders correctly", () => {
    const tree = renderer.create(create(<Container width="20px" />)).toJSON()
    expect(tree).toMatchSnapshot()
    expect(tree).toHaveStyleRule("width", "20px")
})*/
