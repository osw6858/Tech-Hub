import styled, { keyframes } from "styled-components";
import { useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  handleSidbar: () => void;
  isOpen: boolean;
}

const SideBarComponent = ({ handleSidbar, isOpen }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <Container onClick={handleSidbar}>
      <SideMenuWrapper
        style={{ transform: `translateX(${isOpen ? "0" : "-100%"})` }}
        onClick={(event) => event.stopPropagation()}
      >
        <ul>
          <StyledLink to="/mypage">
            <li onClick={handleSidbar}>마이페이지</li>
          </StyledLink>
          <StyledLink to="/add">
            <li onClick={handleSidbar}>새 글 작성</li>
          </StyledLink>
        </ul>
      </SideMenuWrapper>
    </Container>
  );
};

export default SideBarComponent;

const SlideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const Container = styled.div`
  width: 100%;
  min-width: 36rem;
  height: calc(100vh + (32.8rem));
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 200;
  top: 0;
`;

const SideMenuWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 23rem;
  height: 100%;
  background-color: ${({ theme }) => theme.body};
  display: flex;
  flex-direction: column;
  animation: ${SlideIn} 0.5s ease-in-out;

  & > ul {
    margin: 2.2rem;
    & > a {
      font-size: 1.6rem;
      margin: 2rem 0 2rem 2rem;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
