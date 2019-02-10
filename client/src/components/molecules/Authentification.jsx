import styled from "styled-components";
import React from 'react';
import LabelConnection from './../atoms/LabelConnection';
import FieldConnection from './../atoms/FieldConnection';

const LabelContainer = styled.div`
    display: grid;
    align-items: center;
`;

const FieldContainer = styled.div`
    display: grid;
    width: 100%;
`;

const styleAuth = {
    display: 'grid',
    gridTemplateColumns: '40% 57%',
    gridTemplateRows: 'repeat(2, 35%)', 
    gridGap: '14% 3%',
    height: '100%'
};

class Authentification extends React.Component{

    render(){
        return (
            <div style={styleAuth}>
                <LabelContainer>
                    <LabelConnection for="login">Pseudo</LabelConnection>
                </LabelContainer>
    
                <FieldContainer>
                    <FieldConnection type="text" onChange={(evt)=>this.props.setUsername(evt.target.value)} />
                </FieldContainer>
    
                <LabelContainer>
                   <LabelConnection for="password">Mot de Passe</LabelConnection>
                </LabelContainer>
    
                <FieldContainer>
                    <FieldConnection type="password" onChange={(evt)=>this.props.setPassword(evt.target.value)} />
                </FieldContainer>
            </div>
        )
    }
}

export default Authentification;