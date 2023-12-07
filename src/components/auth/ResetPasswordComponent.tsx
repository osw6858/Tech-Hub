import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthInputComponent from "./AuthInputComponent";
import CardButtonComponent from "../common/ButtonComponent";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const ResetPasswordComponent = () => {
  const location = useLocation();
  const userEmail = location.state.userEmail;
  const navigate = useNavigate();

  const [email, setEmail] = useState(userEmail);
  const [errorMsg, setErrorMsg] = useState("");

  const hadleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // 비밀번호 재설정 이메일 전송 성공
        console.log("Password Reset Email Sent Successfully");
        alert("이메일 전송 성공. 이메일을 확인해 주세요.");
        navigate("/");
      })
      .catch((error) => {
        // 에러 처리
        console.error("Error in Password Reset Email: ", error);
        setErrorMsg("전송에 실패했습니다. 다시 시도해 주세요.");
      });
  };

  return (
    <Container>
      <Title>비밀번호 변경</Title>
      <Explanation>
        비밀번호 재설정 링크를 받을 이메일 주소를 확인해 주세요.
      </Explanation>
      {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
      <AuthInputComponent
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="사용할 이메일"
        type="email"
      />
      <CardButtonComponent clickFn={hadleResetPassword} children={"전송"} />
    </Container>
  );
};

export default ResetPasswordComponent;

const Container = styled.div`
  height: 100%;
  margin-top: 2rem;
  display: grid;
  gap: 1.2rem;
  place-items: center;
  color: ${({ theme }) => theme.text};

  & > input {
    font-size: 2rem;
    text-align: center;
    padding: 0;
    margin-top: 5rem;
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

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 2rem;

  @media ${(props) => props.theme.mobile} {
    font-size: 2.5rem;
  }
`;

const Explanation = styled.p`
  font-size: 2rem;
  color: ${({ theme }) => theme.cardFontColor};

  @media ${(props) => props.theme.mobile} {
    font-size: 1.5rem;
  }
`;

const ErrorMsg = styled.span`
  color: red;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;
