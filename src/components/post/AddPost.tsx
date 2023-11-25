import styled, { css } from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import { useAppSelector } from "../../hooks/dispatchHook";
import { useNavigate } from "react-router-dom";
import useAddPostHook from "../../hooks/postHooks/addPostHook";
import useCheckIsLogin from "../../hooks/authHooks/checkIsLoginHook";
import { useState } from "react";
import { apiKey } from "../../firebase/firebaseConfig";

const AddPost = () => {
  useCheckIsLogin();
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.theme);

  const session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const session = sessionStorage.getItem(`${session_key}`) as string;
  const uid = JSON.parse(session).uid;

  const [md, setMd] = useState("");
  const [title, setTitle] = useState("");

  const { handleSave, addPostMutation } = useAddPostHook(title, md, uid);

  return (
    <Container>
      <TitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요."
      ></TitleInput>
      {addPostMutation.isError ? (
        <ErrorText>에러가 발생했습니다.</ErrorText>
      ) : null}
      <Wrapper>
        <div
          className="Editor"
          data-color-mode={theme.dark ? "darkT" : "light"}
        >
          <MDEditor value={md} onChange={(e) => setMd(e || "")} height={865} />
          {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
        </div>
      </Wrapper>
      <ButtonWrapper>
        <SaveButton onClick={handleSave}>저장</SaveButton>
        <ReturnButton onClick={() => navigate("/")}>돌아가기</ReturnButton>
      </ButtonWrapper>
    </Container>
  );
};

export default AddPost;

const Container = styled.div`
  display: grid;
  margin-top: 5rem;
  min-width: 25rem;

  @media ${(props) => props.theme.mobile} {
    font-size: 2.8rem;
    margin-top: 2rem;
  }
`;

const TitleInput = styled.input`
  height: 8rem;
  background-color: ${({ theme }) => theme.body};
  border: none;
  outline: none;
  font-size: 4rem;
  color: ${({ theme }) => theme.text};
  padding-left: 1rem;
  width: 100%;

  @media ${(props) => props.theme.mobile} {
    font-size: 2.8rem;
  }
`;

const Wrapper = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
`;

const ButtonCSS = css`
  background-color: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 1.3rem;
  border: 1xp solid gray;
  font-weight: 600;
  outline: none;
  padding: 1.2rem;
  min-width: 8rem;
  margin: 1.5rem 1rem 0 0;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const SaveButton = styled.button`
  ${ButtonCSS}
`;

const ReturnButton = styled.button`
  ${ButtonCSS}
`;

const ErrorText = styled.div`
  color: red;
  font-size: 2rem;
`;
