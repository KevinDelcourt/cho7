import React from 'react';
import banniere from './../../assets/images/banniere.png';

class HeaderTemplate extends React.Component {
    render(){
        return(
        <div>
            <div className ="banniere">
                <Banniere src={banniere} alt="banniere"/>               
                
            </div>
            
            <div className ="navBar"/>       
        </div>
        );
        }
}
export default HeaderTemplate;
    
