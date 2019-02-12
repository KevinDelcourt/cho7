import React from 'react';
import styled from "styled-components";
import HeaderTemplate from '../organisms/HeaderTemplate';
import FooterTemplate from '../organisms/FooterTemplate';

const BodyContainer = styled.div`
    min-height: 23.5vh;
`;

class Template extends React.Component {
    render(){
		return(
            <div>
                <HeaderTemplate />
                <BodyContainer>{this.props.children}</BodyContainer>
                <FooterTemplate />
            </div> 
        )
	}
}
	
export default Template