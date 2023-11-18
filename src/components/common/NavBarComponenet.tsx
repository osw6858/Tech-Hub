import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBarComponenet = () => {
  return (
    <NavBar>
      <StyledLink to={"/"}>
        <h2>트렌딩</h2>
      </StyledLink>
      <StyledLink to={"/"}>
        <h2>최신</h2>
      </StyledLink>
    </NavBar>
  );
};

export default NavBarComponenet;

const NavBar = styled.nav`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s;

  font-size: clamp(1.4rem, 2vw, 1.6rem);
  display: flex;

  & > a > h2 {
    position: relative;
    margin: 0 2rem 0 2rem;
    font-weight: 600;

    @media ${(props) => props.theme.tablet} {
      display: none;
    }

    @media ${(props) => props.theme.mobile} {
      display: none;
    }

    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -1rem;
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme.text};
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover::after {
      transform: scaleX(1); /* 호버할 때 선이 확대되도록 함 */
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
