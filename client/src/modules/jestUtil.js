import React from "react"

import { BrowserRouter as Router, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore, combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import { appReducer } from "./actionsAndReducers"

const reducers = {
    form: formReducer,
    app: appReducer
}
const reducer = combineReducers(reducers)

let store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const testEnv = component => (
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/" component={component} />
            </div>
        </Router>
    </Provider>
)

export default testEnv
