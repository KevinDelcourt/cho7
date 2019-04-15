import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { Provider } from "react-redux"
import { createStore, combineReducers } from "redux"
import { reducer as formReducer } from "redux-form"
import { appReducer } from "./modules/actionsAndReducers"
import AppMsgDisplay from "./components/molecules/AppMsgDisplay"
import GlobalStyle from "./GlobalStyle"

const reducers = {
    form: formReducer,
    app: appReducer
}
const reducer = combineReducers(reducers)

let store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <Provider store={store}>
        <GlobalStyle />
        <AppMsgDisplay />
        <App />
    </Provider>,
    document.getElementById("root")
)

serviceWorker.unregister()
