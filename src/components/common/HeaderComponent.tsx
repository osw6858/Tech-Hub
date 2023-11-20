import styled, { css } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatchHook";
import { setDark } from "../../redux/ThemeSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginFormComponent from "../login/LoginFormComponent";
import { apiKey, auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(session_key) ? true : false;
  const [loginModal, setLoginModal] = useState(false);
  const [isLogin, setIsLogin] = useState(isSession);
  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem(session_key);
        alert("로그아웃성공");
        setIsLogin(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("로그아웃중 에러발생", error);
      });
  };

  return (
    <Header>
      <Wrapper>
        <StyledLink to={"/"}>
          <Logo>Tech HUB</Logo>
        </StyledLink>
      </Wrapper>
      <MenuItems>
        {theme.dark ? (
          <ThemeSvg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-brightness-high"
            viewBox="0 0 16 16"
            onClick={() => {
              dispatch(setDark());
            }}
          >
            <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
          </ThemeSvg>
        ) : (
          <ThemeSvg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-moon"
            viewBox="0 0 16 16"
            onClick={() => {
              dispatch(setDark());
            }}
          >
            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
          </ThemeSvg>
        )}
        <StyledSvg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
          onClick={() => navigate("/search")}
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </StyledSvg>
        {isLogin ? (
          <>
            <StyledSvg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
            </StyledSvg>
            <LoginButton onClick={handleLogOut}>로그아웃</LoginButton>
          </>
        ) : (
          <LoginButton
            onClick={() => {
              setLoginModal(true);
            }}
          >
            로그인
          </LoginButton>
        )}
      </MenuItems>
      {loginModal && (
        <LoginFormComponent
          setLoginModal={setLoginModal}
          setIsLogin={setIsLogin}
        />
      )}
    </Header>
  );
};

export default HeaderComponent;

const Header = styled.header`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s;
  padding: 1rem 0 1rem 0;
  min-width: 27rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 3rem;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */

  @media ${(props) => props.theme.mobile} {
    height: 8rem;
    padding: 0rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  & > svg {
    display: none;

    @media ${(props) => props.theme.mobile} {
      display: block;
    }

    @media ${(props) => props.theme.tablet} {
      display: block;
    }
  }
`;

const Logo = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  flex-grow: 1;

  @media ${(props) => props.theme.mobile} {
    font-size: 2rem;
  }
`;

const MenuItems = styled.div`
  display: flex;
  align-items: center;
`;

const SvgStyle = css`
  min-width: 2.5rem;
  min-height: 2.5rem;
  transition: all 0.3s;
  fill: currentColor;
  display: blocks;
  margin: 0 1.1rem 0 1.1rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  @media ${(props) => props.theme.mobile} {
    margin: 0 0.8rem 0 0.8rem;
    min-width: 2.6rem;
    min-height: 2.6rem;
  }
`;

const StyledSvg = styled.svg`
  ${SvgStyle}

  &:hover {
    transform: scale(1.2);
  }
`;

const ThemeSvg = styled.svg`
  ${SvgStyle}

  &:hover {
    transform: scale(1.2);
  }
`;

const LoginButton = styled.button`
  background-color: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  padding: 0.5rem 1.8rem 0.5rem 1.8rem;
  border-radius: 5rem;
  font-size: 1.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }

  @media ${(props) => props.theme.mobile} {
    min-width: 7rem;
    font-size: 1.2rem;
    padding: 0.5rem 0rem 0.5rem 0rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
