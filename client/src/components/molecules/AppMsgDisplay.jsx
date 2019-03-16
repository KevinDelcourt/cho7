import React , { Component } from 'react'
import { connect } from 'react-redux'

class AppMsgDisplay extends Component {
    
    state = {
        oldMsg: "",
        display: false
    }

    componentDidUpdate = () => {
        if(this.state.oldMsg !== this.props.msg)
            this.setState({oldMsg: this.props.msg, display: true})
    }
    render = () => 
        this.state.display ?
        <div style={{position: 'fixed', top: "0", left: "0"}}>
            <p>{this.props.msg}</p>
            <button onClick={()=>this.setState({display: false})}>dismiss</button>
        </div>:""

}

const mapStateToProps = (state) => {
    return {
        msg: state.app.msg
    }
}

export default connect(mapStateToProps)(AppMsgDisplay)