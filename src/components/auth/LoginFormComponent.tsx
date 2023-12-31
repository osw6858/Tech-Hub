import styled from "styled-components";
import { useRef, useState } from "react";
import useLogin from "../../hooks/authHooks/loginHook";
import { Link } from "react-router-dom";
import AuthInputComponent from "./AuthInputComponent";
import CardButtonComponent from "../common/ButtonComponent";

interface ModalState {
  setLoginModal: (isOpen: boolean) => void;
}

const LoginFormComponent = ({ setLoginModal }: ModalState) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const LoginArgs = {
    email,
    password,
    setLoginModal,
    setErrorMsg,
    emailRef,
    passwordRef,
  };

  const { handleLogin } = useLogin(LoginArgs);

  return (
    <Container onClick={() => setLoginModal(false)}>
      <ContentWrapper onClick={(e) => e.stopPropagation()}>
        <p>Login</p>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        <LoginForm onSubmit={handleLogin}>
          <InputGroup>
            <AuthInputComponent
              ref={emailRef}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 입력"
              type="email"
            />
            <AuthInputComponent
              ref={passwordRef}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력 "
              type="password"
            />
          </InputGroup>
          <ButtonGroup>
            <LoginButton type="submit">로그인</LoginButton>
            {errorMsg === "비밀번호가 일치하지 않습니다." ? (
              <StyledLink
                to={"/reset"}
                state={{ userEmail: email }}
                onClick={() => setLoginModal(false)}
              >
                <FindPassword onClick={() => setLoginModal(false)}>
                  비밀번호를 잊으셨나요?
                </FindPassword>
              </StyledLink>
            ) : (
              <StyledLink to={"/singup"} onClick={() => setLoginModal(false)}>
                <SingUp>아직 회원이 아니신가요?</SingUp>
              </StyledLink>
            )}
          </ButtonGroup>
        </LoginForm>
      </ContentWrapper>
    </Container>
  );
};

export default LoginFormComponent;

const Container = styled.div`
  width: 100%;
  min-width: 36rem;
  height: 100%; //calc(100vh + (32.8rem));
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 200;
  top: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 4rem;
  width: 20%;
  min-width: 30rem;
  z-index: 300;
  border: ${({ theme }) => theme.cardBorder};
  background-color: ${({ theme }) => theme.body};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
  opacity: 100;
  border-radius: 1rem;

  & > p {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 4rem;
  }
`;

const LoginForm = styled.form`
  display: grid;
  width: 100%;
`;

const InputGroup = styled.div`
  display: grid;
  gap: 1.2rem;
  place-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
`;

const LoginButton = styled(CardButtonComponent)`
  width: 100%;
`;

const ErrorMsg = styled.span`
  color: red;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;

const SingUp = styled.p`
  font-size: 1.4rem;
  margin-top: 2rem;
  color: ${({ theme }) => theme.text};
`;

const FindPassword = styled.p`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text};
  margin-top: 2rem;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
