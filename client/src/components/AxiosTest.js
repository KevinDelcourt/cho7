import React, { Component } from 'react';
import axios from 'axios'
import cookies from 'browser-cookies'

export class AxiosTestGet extends Component {
    state = { status: "vide", adresse: "HAS_ROLE/CREATEUR" }
  
    sendRequest = ()=>axios.get('http://localhost:8180/'+this.state.adresse,{withCredentials:true})
    .then((response)=>{
        console.log(response)
        this.setState({status:response.data})
    }).catch((error)=>console.log(error))

    render() {
      return (
        <div>
          <div>Réponse: {this.state.status}</div>
          <div>Adresse requête GET: http://localhost:8180/{this.state.adresse}</div>
          <input type="text" value={this.state.adresse}  onChange={(evt)=>this.setState({adresse:evt.target.value})}/>
          <button onClick={this.sendRequest}>Effectuer la requête</button>
        </div>
      )
    }
  }

  export class AxiosTestPost extends Component {
    state = {username:"Admin",password:"Admin",adresse:"login",reponse:"vide"}

    sendRequest = ()=>axios.post('http://localhost:8180/'+this.state.adresse,{
        username: this.state.username,
        password: this.state.password
    }).then( (response) => {
        console.log(response)
        this.setState({reponse:response.data})
        if(response.data.substring(0,1) == 's')
            cookies.set('connect.sid', response.data)

    }).catch((error)=>{
        console.log(error)
        this.setState({reponse:"erreur"})
    })

    render() {
      return (
        <div>
          <span>Addresse POST: http://localhost:8180/{this.state.adresse}</span><br/>
          <input type="text" value={this.state.adresse} onChange={(evt)=>this.setState({adresse:evt.target.value})}/><br />

          <span>Username: {this.state.username}</span><br/>
          <input type="text" value={this.state.username} onChange={(evt)=>this.setState({username:evt.target.value})}/><br />

          <span>Password: {this.state.password}</span><br/>
          <input type="password" value={this.state.password} onChange={(evt)=>this.setState({password:evt.target.value})}/><br />
        
          <button onClick={this.sendRequest}>Effectuer la requête</button>
          <span>Réponse: {this.state.reponse}</span>
        </div>
      )
    }
  }