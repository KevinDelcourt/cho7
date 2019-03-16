import React from 'react';
import banniere from '../../assets/images/banniere.png';
import Banniere from '../atoms/Banniere';
import BarreMenu from '../molecules/BarreMenu';
import { Link } from 'react-router-dom'

class HeaderTemplate extends React.Component {
    render() {
        return (
            <div>
                <center><Link to="/"><Banniere src={banniere} alt="banniere" /></Link></center> 
                <BarreMenu />  
            </div>
        );
    }
}
export default HeaderTemplate;

