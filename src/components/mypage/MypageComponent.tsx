import styled from "styled-components";
import useCheckIsLogin from "../../hooks/authHooks/checkIsLoginHook";
import { useState } from "react";
import { apiKey } from "../../firebase/firebaseConfig";
import MypostComponent from "./MypostComponent";
import UserInfoComponent from "./UserInfoComponent";

const MypageComponent = () => {
  useCheckIsLogin();

  const [update, setUpdate] = useState(false);

  const session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const session = sessionStorage.getItem(`${session_key}`);

  if (!session) {
    //권한 없이 접근시 마이페이지에 개인정보는 노출을 하면 안됨
    return null;
  }

  const user = JSON.parse(session);

  //TODO: 변경취소 버튼 만들기
  return (
    <Container onClick={() => setUpdate(false)}>
      <UserInfoComponent update={update} setUpdate={setUpdate} />
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

  @media ${(props) => props.theme.mobile} {
    font-size: 3.6rem;
  }
`;
