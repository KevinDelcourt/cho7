import React, { Component } from "react"
import { connect } from "react-redux"
import Container from "../atoms/Container/Container"
import Button from "../atoms/Button/Button"

class AppMsgDisplay extends Component {
    state = {
        oldMsg: "",
        display: false
    }

    componentDidUpdate = () => {
        if (this.state.oldMsg !== this.props.msg)
            this.setState({ oldMsg: this.props.msg, display: true })
    }
    render = () =>
        this.state.display ? (
            <div
                style={{
                    position: "fixed",
                    bottom: "5px",
                    width: "100%",
                    zIndex: "1000"
                }}>
                <center>
                    <Container
                        style={{
                            width: "max-content"
                        }}>
                        <p>{this.props.msg}</p>
                        <Button
                            onClick={() => this.setState({ display: false })}>
                            OK
                        </Button>
                    </Container>
                </center>
            </div>
        ) : (
            ""
        )
}

const mapStateToProps = state => {
    return {
        msg: state.app.msg
    }
}

export default connect(mapStateToProps)(AppMsgDisplay)
