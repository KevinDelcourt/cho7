import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    margin: 10px 0;
    padding: 5px 10px;
    background: rgba(255, 255, 255, 0.54);
	border-radius: 10px;
	overflow-wrap: break-word;
	font-family: 'Ruluko', Arial, Sans-serif;
`;


export default class Creation extends Component {
	render() {
		let path = "http://localhost:8180/public/audio/" + this.props.path;

		return (
			<div>
				<audio controls>
				<source src={path} type="audio/mpeg" />
				</audio>
				<Wrapper>
					{this.props.description}
				</Wrapper>
			</div>
		);
	}
}
