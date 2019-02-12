import styled from "styled-components";
import React from 'react';

const PlacementNCreation = styled.div`
    position: absolute;
    left: 0.85%;
    right: 61.84%;
    top: 1.64%;
    bottom: 85.77%;

    font-family: Almendra SC;
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 30px;
    text-align: center;    
`

const UploadContainer = styled.div`
    margin-top: 8vh;
    height: 15vh;
`;

const FooterUpload = styled.div`
    position: absolute;
    right: 2.12%;
    bottom: 3.01%;
    
    padding:5px;
`;

export default class UploadForm extends React.Component{

    render(){
        return(<div>
            <PlacementNCreation children="Nouvelle Création" />
            <UploadContainer children="Formulaire Upload ici" />
            <FooterUpload children="Bouton publier"/>
        </div>)
    }
}