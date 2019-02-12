import React from 'react';
import banniere from '../../assets/images/banniere.png';
import Banniere from '../atoms/Banniere';

class HeaderTemplate extends React.Component {
    render() {
        return (
            <div>
                <center><Banniere src={banniere} alt="banniere" /></center> 
                <div className="navBar" />
            </div>
        );
    }
}
export default HeaderTemplate;

