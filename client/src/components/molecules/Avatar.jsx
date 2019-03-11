import styled from "styled-components";

const Avatar = styled.img`
	border-radius: 10px;
	width: ${props => props.w || 230}px ;
	height: ${props => props.h || 230}px;
	margin-right: auto;
	margin-left: auto;
`;

export default Avatar;
