import styled, { css } from "styled-components";
import {
  auth,
  signInWithEmailAndPassword,
} from "../../firebase/firebaseConfig";
import { useRef, useState } from "react";
import { browserSessionPersistence, setPersistence } from "firebase/auth";
import { FirebaseError } from "firebase/app";

interface ModalState {
  setLoginModal: (isOpen: boolean) => void;
  setIsLogin: (isLogin: boolean) => void;
}

const LoginFormComponent = ({ setLoginModal, setIsLogin }: ModalState) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setPersistence(auth, browserSessionPersistence).then(() => {
        console.log("로그인 성공");
        setLoginModal(false);
        setIsLogin(true);
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;

        switch (errorCode) {
          case "auth/user-not-found":
            setErrorMsg("일치하는 이메일이 없습니다.");
            emailRef.current?.focus();
            break;
          case "auth/wrong-password":
            setErrorMsg("비밀번호가 일치하지 않습니다.");
            passwordRef.current?.focus();
            break;
        }
      }
    }
  };
  //커스텀훅으로 만들면 넘겨줘야할 인자들이 많아져 오히려 코드의 복잡성이 증가할거 같음

  return (
    <Container onClick={() => setLoginModal(false)}>
      <ContentWrapper onClick={(e) => e.stopPropagation()}>
        <p>Login</p>
        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
        <LoginForm onSubmit={handleLogin}>
          <InputGroup>
            <EmailInput
              ref={emailRef}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 입력"
              type="email"
            />
            <PasswordInput
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

const InputCSS = css`
  background-color: ${({ theme }) => theme.body};
  min-height: 3rem;
  padding-left: 1.5rem;
  outline: none;
  border: none;
  border-bottom: ${({ theme }) => theme.border};
  margin: 1rem 0 1rem 0;
  color: ${({ theme }) => theme.text};
  transition: all 0.2s;
  width: 92%;

  &:hover {
    background-color: ${({ theme }) => theme.input};
  }
`;

const EmailInput = styled.input`
  ${InputCSS}
`;

const PasswordInput = styled.input`
  ${InputCSS}
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
`;

const LoginButton = styled.button`
  background-color: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 1.3rem;
  border: 1xp solid gray;
  font-weight: 600;
  outline: none;
  padding: 1.2rem;
  width: 100%;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const ErrorMsg = styled.span`
  color: red;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;
