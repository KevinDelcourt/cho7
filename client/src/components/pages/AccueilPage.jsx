import React from 'react';
import FooterTemplate from '../organisms/FooterTemplate';
import HeaderTemplate from '../organisms/HeaderTemplate';

const AccueilPage = () => (
    <div>
      <HeaderTemplate />
      <h2 class="App-link">Accueil</h2>
      <FooterTemplate left={<a href="/">La Compagnie de l'Aventure</a>} right={<a href="/">A propos</a>}/>
    </div>
  )
  
export default AccueilPage