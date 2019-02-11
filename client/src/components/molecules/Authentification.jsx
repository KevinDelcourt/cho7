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

const Authentification = () => {
    return (
        <div style={styleAuth}>
            <LabelContainer>
                <LabelConnection>Pseudo</LabelConnection>
            </LabelContainer>

            <FieldContainer>
                <FieldConnection type="text" name="login" />
            </FieldContainer>

            <LabelContainer>
               <LabelConnection>Mot de Passe</LabelConnection>
            </LabelContainer>

            <FieldContainer>
                <FieldConnection type="password" name="password" />
            </FieldContainer>
        </div>
    );
};

export default Authentification;