import styled from "styled-components";
import React from 'react';
import Template from './Template';
import { hasRole } from '../../modules/auth';
import CreationsInProgress from '../organisms/CreationsInProgress';
import MainContainer from '../molecules/MainContainer';

const SubContainer = styled.div`
    display: grid;
    grid-row-gap: 20px;
    grid-template-columns: 100%;
`;

class MesCreationsPage extends React.Component {
    state = {auth:false}

    async componentDidMount(){
        document.title = "Mes créations";
        this.setState({auth:await hasRole("CREATEUR")})
    }

    render() {
        if (this.state.auth)
            return(
                <div>
                    <Template>
                        <SubContainer>
                            <MainContainer>
                                <center><a href="/newCreation" style={{fontSize: 35 + 'px'}}>NOUVELLE CRÉATION</a></center>
                            </MainContainer>
                            <CreationsInProgress />
                        </SubContainer>
                    </Template>
                </div>
            )
        return <span />
    }
}
	
export default MesCreationsPage