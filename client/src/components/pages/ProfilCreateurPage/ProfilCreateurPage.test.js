import React from "react"
import renderer from "react-test-renderer"
import "jest-styled-components"
import ProfilCreateurPage from "./ProfilCreateurPage"

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

test("renders without crashing", () => {
    const tree = renderer
        .create(
            <Provider store={store}>
                <Router>
                    <div>
                        <Route path="/" component={ProfilCreateurPage} />
                    </div>
                </Router>
            </Provider>
        )
        .toJSON()
})
