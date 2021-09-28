import styled from 'styled-components';

const StyledIcon = styled.img`
   transform: rotate(${props => props.rotate}deg);
`;

function Icon(props) {
   return <StyledIcon width={15} {...props} />;
}

export default Icon;
