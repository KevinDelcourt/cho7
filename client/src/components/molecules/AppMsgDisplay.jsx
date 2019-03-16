import React , { Component } from 'react'
import { connect } from 'react-redux'

class AppMsgDisplay extends Component {

    render = () => 
        <div style={{position: 'fixed', top: "0", left: "0"}}>
            <p>{this.props.msg.msg}</p>
        </div>
}

const mapStateToProps = (state) => {
    return {
        msg: state.msg
    }
}

export default connect(mapStateToProps)(AppMsgDisplay)