import React from 'react';
import banniere from '../../assets/images/banniere.png';
import Banniere from '../atoms/Banniere';

class HeaderTemplate extends React.Component {
    render() {
        return (
            <div>
                <center><a href="/"><Banniere src={banniere} alt="banniere" /></a></center> 
                <div className="navBar" />
            </div>
        );
    }
}
export default HeaderTemplate;

