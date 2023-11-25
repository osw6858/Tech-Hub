import styled from "styled-components";
import useCheckIsLogin from "../../hooks/authHooks/checkIsLoginHook";
import { useState } from "react";
import AuthInputComponent from "../common/AuthInputComponent";
import useUpdateNickName from "../../hooks/mypagehook/updateNicknameHook";
import { apiKey } from "../../firebase/firebaseConfig";
import MypostComponent from "./MypostComponent";

const MypageComponent = () => {
  useCheckIsLogin();

  const [update, setUpdate] = useState(false);
  const [nickName, setNickName] = useState("");

  const { handleUpdateNickName } = useUpdateNickName(
    nickName,
    setUpdate,
    setNickName
  );

  const session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const session = sessionStorage.getItem(`${session_key}`);

  if (!session) {
    return null;
  }

  const user = JSON.parse(session);

  return (
    <Container>
      <UserInfoWrapper>
        <div>
          {update ? null : <InfoTitle>닉네임</InfoTitle>}
          {update ? (
            <AuthInputComponent
              id={"nickName"}
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              placeholder={"변경할 닉네임 입력"}
              type={"text"}
            />
          ) : (
            <Info>{"displayName" in user ? user.displayName : "익명"}</Info>
          )}
        </div>
        {update ? (
          <UpdateButton onClick={handleUpdateNickName}>저장</UpdateButton>
        ) : (
          <UpdateButton onClick={() => setUpdate(true)}>수정</UpdateButton>
        )}
      </UserInfoWrapper>
      <PostListWrapper>
        <MypostTitle>My posts</MypostTitle>
        <MypostComponent uid={user.uid} />
      </PostListWrapper>
    </Container>
  );
};

export default MypageComponent;

const Container = styled.div`
  width: 60%;
  margin: 0 auto;

  @media ${(props) => props.theme.tablet} {
    width: 85%;
  }

  @media ${(props) => props.theme.mobile} {
    width: 95%;
  }
`;

const UserInfoWrapper = styled.div`
  margin-top: 5rem;
  border-bottom: 1px solid ${({ theme }) => theme.contour};
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div > input {
    margin: 0 0 0 0;
  }

  @media ${(props) => props.theme.mobile} {
    padding: 0 0 3rem 0;
  }
`;

const InfoTitle = styled.span`
  font-size: 2rem;
  font-weight: 600;
  margin-right: 2rem;
`;

const Info = styled.span`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.cardFontColor};
`;

const UpdateButton = styled.button`
  background-color: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 1.3rem;
  border: 1xp solid gray;
  font-weight: 600;
  outline: none;
  padding: 1rem;
  min-width: 6rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const PostListWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MypostTitle = styled.h2`
  font-size: 4rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;
