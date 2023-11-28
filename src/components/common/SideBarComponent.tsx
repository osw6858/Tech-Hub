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
            <StyledSvg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </StyledSvg>
            <li onClick={handleSidbar}>마이페이지</li>
          </StyledLink>
          <StyledLink to="/add">
            <StyledSvg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </StyledSvg>
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
    margin: 2.2rem 2.2rem 2.2rem 1rem;
    & > a {
      font-size: 1.6rem;
      margin: 2rem 0 2.8rem 2.2rem;
    }
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: inherit;
`;

const StyledSvg = styled.svg`
  min-width: 2rem;
  min-height: 2rem;
  transition: all 0.3s;
  fill: currentColor;
  margin: 0 1.2rem 0 0;

  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;
