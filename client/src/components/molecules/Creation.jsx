import React, { Component } from "react";
import styled from "styled-components";
import { hasRole , deleteCreation} from '../../modules/api';
import { getAudioUrl } from '../../modules/apiURL'

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
		const path = getAudioUrl() + this.props.path;

		if (this.state.auth) {
			return (
				<React.Fragment>
					<audio controls>
						<source src={path} type="audio/mpeg" />
					</audio>

					<Wrapper>
						<div>{this.props.description}</div>
						<Suprime>
							<a href={"http://localhost:3000/updateCreation/audio/" + this.props.valueId}>Modifier</a>
							<button className="far fa-times-circle fa-2x" onClick={()=>deleteCreation(this.props.valueId)} ></button>
						</Suprime>
					</Wrapper>
				</React.Fragment>

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
