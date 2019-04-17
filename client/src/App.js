import React, { Component, Fragment } from "react"
import ConnectionPage from "./components/pages/ConnectionPage.jsx"
import AccueilPage from "./components/pages/AccueilPage"
import UploadPage from "./components/pages/UploadPage"
import MesCreationsPage from "./components/pages/MesCreationsPage"
import RenseignerProfilPage from "./components/pages/RenseignerProfilPage"
import PersonnalisationPage from "./components/pages/PersonnalisationPage"
import UpdateCreationPage from "./components/pages/UpdateCreationPage"
import PageProfilCreateur from "./components/pages/ProfilCreateurPage/ProfilCreateurPage"
import FaqPage from "./components/pages/FaqPage"
import CreationPage from "./components/pages/CreationPage"
import Logout from "./components/pages/Logout"
import { hasRole, getTheme } from "./modules/api"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { userLoginAction, themeAction } from "./modules/actionsAndReducers"
import GlobalStyle from "./GlobalStyle"

class App extends Component {
    state = {}

    componentDidMount = async () => {
        this.props.userLoginAction(await hasRole("CREATEUR"), true)
        let dbTheme = await getTheme()
        let theme = { ...this.props.theme, ...dbTheme }
        this.props.themeAction(theme)
        this.setState({ loaded: true })
    }

    getRedirect = () => (this.state.loaded ? <Redirect to="/" /> : "")

    PrivateRoute = ({ component: Component, condition, ...rest }) => (
        <Route
            {...rest}
            render={props =>
                condition ? <Component {...props} /> : this.getRedirect()
            }
        />
    )

    render = () =>
        this.state.loaded ? (
            <Router>
                <Fragment>
                    <GlobalStyle />
                    <Route exact path="/" component={AccueilPage} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/about" component={PageProfilCreateur} />
                    <Route path="/accueil" component={this.getRedirect} />
                    <Route path="/creation/:id" component={CreationPage} />
                    <Route path="/faq" component={FaqPage} />
                    <this.PrivateRoute
                        path="/login"
                        component={ConnectionPage}
                        condition={!this.props.role_createur}
                    />
                    <this.PrivateRoute
                        path="/newCreation"
                        component={UploadPage}
                        condition={this.props.role_createur}
                    />
                    <this.PrivateRoute
                        path="/updateCreation/:id"
                        component={UpdateCreationPage}
                        condition={this.props.role_createur}
                    />
                    <this.PrivateRoute
                        path="/creations"
                        component={MesCreationsPage}
                        condition={this.props.role_createur}
                    />
                    <this.PrivateRoute
                        path="/RenseignerProfilPage"
                        component={RenseignerProfilPage}
                        condition={this.props.role_createur}
                    />
                    <this.PrivateRoute
                        path="/personnaliser"
                        component={PersonnalisationPage}
                        condition={this.props.role_createur}
                    />
                </Fragment>
            </Router>
        ) : (
            ""
        )
}

const mapStateToProps = state => {
    return {
        role_createur: state.app.role_createur,
        theme: state.app.theme
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ userLoginAction, themeAction }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
