import styled from "styled-components";
import AuthInputComponent from "./AuthInputComponent";
import { useRef, useState } from "react";
import useSingUp from "../../hooks/authHooks/singupHook";
import useName from "../../hooks/authHooks/setUserName";

const SingUpComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const singUpArgs = {
    email,
    password,
    setErrorMsg,
    emailRef,
    passwordRef,
  };

  const { handleSingUp, isSingUp } = useSingUp(singUpArgs);

  const { setUserNickName } = useName(nickName);

  return (
    <>
      {/** TODO: 닉네임 설정 컴포넌트로 분리 */}
      {isSingUp ? (
        <SingUpContainer onSubmit={setUserNickName}>
          <p>Tech HUB 가입을 축하합니다!</p>
          <InfoMsg>
            <p>정상적으로 가입이 완료되었습니다.</p>
            <span> 본인을 나타낼 이름을 설정해 주세요.</span>
          </InfoMsg>

          <AuthInputComponent
            id="nickName"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            placeholder="나를 나타낼 이름"
            type="text"
          />
          <SingupButton type="submit">완료</SingupButton>
        </SingUpContainer>
      ) : (
        <SingUpContainer onSubmit={handleSingUp}>
          <p>Sing Up</p>
          <ErrorMsg>{errorMsg}</ErrorMsg>
          <AuthInputComponent
            ref={emailRef}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="사용할 이메일"
            type="email"
          />
          <AuthInputComponent
            ref={passwordRef}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="사용할 비밀번호 "
            type="password"
          />
          <SingupButton type="submit">회원가입</SingupButton>
        </SingUpContainer>
      )}
    </>
  );
};

export default SingUpComponent;

const SingUpContainer = styled.form`
  height: 100%;
  margin-top: 2rem;
  display: grid;
  gap: 1.2rem;
  place-items: center;

  & > p {
    font-size: 4rem;
    font-weight: 800;
    margin-bottom: 2rem;
  }

  & > input {
    margin-top: 2rem;
    width: 30%;

    @media ${(props) => props.theme.laptop} {
      width: 45%;
    }

    @media ${(props) => props.theme.tablet} {
      width: 55%;
    }

    @media ${(props) => props.theme.mobile} {
      width: 80%;
    }
  }
`;

const InfoMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > p {
    font-size: 2rem;
  }

  & > span {
    color: ${({ theme }) => theme.cardFontColor};
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const SingupButton = styled.button`
  background-color: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 1.3rem;
  border: 1xp solid gray;
  font-weight: 600;
  outline: none;
  padding: 1.2rem;
  width: 12rem;
  transition: all 0.2s;
  cursor: pointer;
  margin-top: 3rem;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const ErrorMsg = styled.span`
  color: red;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;
