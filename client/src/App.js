import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cadre from './components/pages/Connexion/Cadre';
import CadreLogo from './components/pages/Connexion/CadreLogo';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <CadreLogo left="5" top="1"> Logo </CadreLogo>,
          <Cadre w="30" h="5" left="45" top="2"> Titre </Cadre>
        </div>,
        <Cadre w="25" h="50" left="35" top="10">
          <Cadre w="15" h="5" left="5" top="1"> Titre connexion </Cadre>
          <Cadre w="20" h="2.5" left="2" top="10">Zone Pseudo</Cadre>
          <Cadre w="20" h="2.5" left="2" top="2">Zone Mdp</Cadre>
          <Cadre w="10" h="3" left="7" top="5">Bouton Connexion</Cadre>
          <Cadre w="7" h="2.5" left="4" top="6">Mdp oublié</Cadre>
        </Cadre>
      </div>
    );
  }
}

export default App;
