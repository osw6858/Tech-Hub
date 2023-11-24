import styled, { css } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks/dispatchHook";
import { setDark } from "../../redux/ThemeSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginFormComponent from "../auth/LoginFormComponent";
import { apiKey, auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import SideBarComponent from "./SideBarComponent";

const HeaderComponent = () => {
  const navigate = useNavigate();

  const session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(`${session_key}`) ? true : false;

  const [loginModal, setLoginModal] = useState(false);
  const [isLogin, setIsLogin] = useState(isSession);
  const [sidBar, setSidBar] = useState(false);

  const theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSession) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [isSession]);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem(session_key);
        setIsLogin(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("로그아웃중 에러발생", error);
      });
  };

  //console.log(auth.currentUser); 여기서는 왜 currentUser가 뜨지 않는걸까...

  return (
    <Header>
      {sidBar && (
        <SideBarComponent
          isOpen={sidBar}
          handleSidbar={() => setSidBar(false)}
        />
      )}
      <Wrapper>
        <ListSvg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
          onClick={() => setSidBar(true)}
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </ListSvg>
        <StyledLink to={"/"}>
          <Logo>Tech HUB</Logo>
        </StyledLink>
      </Wrapper>
      <MenuItems>
        {theme.dark ? (
          <MobliSvg
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
          </MobliSvg>
        ) : (
          <MobliSvg
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
          </MobliSvg>
        )}
        <MobliSvg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
          onClick={() => navigate("/search")}
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </MobliSvg>
        {isLogin ? (
          <>
            <StyledLink to={"/add"}>
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
            </StyledLink>
            <StyledLink to={"/mypage"}>
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
            </StyledLink>
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
      {loginModal && <LoginFormComponent setLoginModal={setLoginModal} />}
    </Header>
  );
};

export default HeaderComponent;
//export const MemoHeader = React.memo(HeaderComponent);

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 30;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s;
  padding: 1rem 0 1rem 0;
  min-width: 27rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    font-size: 1.8rem;
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
  margin: 0 1.1rem 0 1.1rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }

  @media ${(props) => props.theme.mobile} {
    margin: 0 0.8rem 0 0.8rem;
    min-width: 2.6rem;
    min-height: 2.6rem;
  }
`;

const ListSvg = styled.svg`
  ${SvgStyle}
  display: none;

  @media ${(props) => props.theme.mobile} {
    display: block;
  }
`;

const StyledSvg = styled.svg`
  ${SvgStyle}

  &:hover {
    transform: scale(1.2);
  }

  @media ${(props) => props.theme.tablet} {
    display: none;
  }

  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;

const MobliSvg = styled.svg`
  ${SvgStyle}
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
  margin: 0 0 0 1rem;

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
