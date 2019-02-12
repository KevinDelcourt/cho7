import React from 'react';
import FooterTemplate from '../organisms/FooterTemplate';

const AccueilPage = () => (
    <div>
      <h2>Accueil</h2>
      <FooterTemplate left={<a href="/">La Compagnie de l'Aventure</a>} right={<a href="/">A propos</a>}/>
    </div>
  )
  
export default AccueilPage