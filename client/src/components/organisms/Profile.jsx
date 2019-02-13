import React from 'react';
import { getCreator } from '../../modules/auth';
import Avatar from '../molecules/Avatar';
import profilPic from '../../assets/images/profil.png';

export default class Profile extends React.Component{
    state = {creations: []}

    async componentDidMount(){
        this.setState({creations: await getCreator()})
    }

    render(){
        return(
            <div>
                <Avatar pathImage={profilPic} />
                {this.state.creations.map((u) => 
                    <div>
                        <h2>{u.username}</h2>
                        <h3>{u.presentation}</h3>
                    </div>
                )}
            </div>
        )
    }
}