import styled from 'styled-components';

const Label = styled.label`
    font-family: ${props => props.font || "Arial"};
    font-size: 20px;
`;

export default Label;