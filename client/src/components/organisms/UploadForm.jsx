import styled from "styled-components";
import React from 'react';
import MainContainer from './../molecules/MainContainer';

const UploadContainer = styled.div`
    margin-top: 8vh;
    height: 15vh;
`;

const FooterUpload = styled.div`
    padding: 10px;
`;

export default class UploadForm extends React.Component{

    render(){
        let child = [<UploadContainer children="Formulaire Upload ici" />, <FooterUpload children="Bouton publier"/>]
        return(
            <MainContainer title="Nouvelle Création" children={child} />
        )
    }
}