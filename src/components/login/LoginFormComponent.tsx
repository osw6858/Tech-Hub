import styled from "styled-components";
import {
  auth,
  signInWithEmailAndPassword,
} from "../../firebase/firebaseConfig";
import { useState } from "react";
import { browserSessionPersistence, setPersistence } from "firebase/auth";

interface ModalState {
  setLoginModal: (isOpen: boolean) => void;
  setIsLogin: (isLogin: boolean) => void;
}

const LoginFormComponent = ({ setLoginModal, setIsLogin }: ModalState) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCloseModal = () => {
    setLoginModal(false);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginResult = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = loginResult.user;
      console.log(user);
      setPersistence(auth, browserSessionPersistence).then(() => {
        console.log("로그인 성공");
        setLoginModal(false);
        setIsLogin(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <p>환영합니다!</p>
        <LoginForm onSubmit={handleLogin}>
          <InputGroup>
            <Label>아이디</Label>
            <IdInput
              value={email}
              onChange={handleEmail}
              placeholder="이메일 입력"
              type="email"
            />
            <Label>비밀번호</Label>
            <PasswordInput
              value={password}
              onChange={handlePassword}
              placeholder="비밀번호 입력 "
              type="password"
            />
          </InputGroup>
          <ButtonGroup>
            <LoginButton type="submit">로그인</LoginButton>
            <CancleButton onClick={handleCloseModal}>취소</CancleButton>
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
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: grid;
  gap: 1.2rem;
  place-items: center;
`;

const Label = styled.label`
  font-size: 2rem;
`;

const IdInput = styled.input`
  min-height: 3rem;
  border-radius: 1rem;
  outline: none;
  padding-left: 1.5rem;
`;

const PasswordInput = styled.input`
  min-height: 3rem;
  border-radius: 1rem;
  outline: none;
  padding-left: 1.5rem;
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
  border-radius: 2rem;
  border: 1xp solid gray;
  font-weight: 600;
  outline: none;
  margin-right: 2rem;
  padding: 1.2rem;
`;

const CancleButton = styled.button`
  background-color: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 2rem;
  border: 1xp solid gray;
  font-weight: 600;
  outline: none;
  padding: 1.2rem;
`;
