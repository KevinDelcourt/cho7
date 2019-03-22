import React, { Component } from "react";
import styled from "styled-components";
import { hasRole } from '../../modules/auth';

const Wrapper = styled.div`
	margin: 10px 0;
	padding: 5px 10px;
	background: rgba(255, 255, 255, 0.54);
	border-radius: 10px;
	overflow-wrap: break-word;
	font-family: 'Ruluko', Arial, Sans-serif;
`;

const Suprime =styled.div`
	display: flex;
	justify-content: flex-end;
`;

export default class Creation extends Component {
	state={
		auth:false
	}

	async componentDidMount() {
		this.setState({auth:await hasRole("CREATEUR")})
	}    
	 
	render() {
		const path = "http://localhost:8180/public/audio/" + this.props.path;

		if (this.state.auth) {
			return (
				<form action="http://localhost:8180/suprCreation" method="post" enctype="multipart/form-data">
					<audio controls>
						<source src={path} type="audio/mpeg" />
					</audio>

					<Wrapper>
						<div>{this.props.description}</div>
						<Suprime>
							<a href={"http://localhost:3000/updateCreation/audio/" + this.props.valueId}>Modifier</a>
							<button type="submit" class="far fa-times-circle fa-2x" ></button>
							<input type="hidden" name="idCreation" value={this.props.valueId}/>
						</Suprime>
					</Wrapper>
				</form>
			);
		} else {
			return (
				<React.Fragment>
					<audio controls>
						<source src={path} type="audio/mpeg" />
					</audio>

					<Wrapper>
						<div>{this.props.description}</div>
					</Wrapper>
				</React.Fragment>
			);
		}
	}
}
