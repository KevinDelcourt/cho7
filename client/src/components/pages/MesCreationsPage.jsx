import styled from "styled-components";
import React from 'react';
import Template from './Template';
import CreationsInProgress from '../organisms/CreationsInProgress';
import MainContainer from '../molecules/MainContainer';

const SubContainer = styled.div`
    display: grid;
    grid-row-gap: 20px;
    grid-template-columns: 100%;
`;

const MesCreationsPage = () => (
	<div>
		<Template>
            <SubContainer>
                <MainContainer>
                    <center><a href="/upload" style={{fontSize: 35 + 'px'}}>NOUVELLE CRÉATION</a></center>
                </MainContainer>
                <CreationsInProgress />
            </SubContainer>
		</Template>
	</div>
)
	
export default MesCreationsPage