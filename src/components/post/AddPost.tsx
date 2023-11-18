import styled, { css } from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/dispatchHook";
import { addDoc, collection } from "firebase/firestore/lite";
import { apiKey, auth, db } from "../../firebase/firebaseConfig";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const AddPost = () => {
  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey) ? true : false;

  const navigate = useNavigate();
  const [md, setMd] = useState("");
  const [title, setTitle] = useState("");

  const theme = useAppSelector((state) => state.theme);
  const now = dayjs();

  useEffect(() => {
    if (!isSession) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSession]);

  const mutation = useMutation(
    (newMd: {
      content: string;
      uid: string | undefined;
      displayName: string | undefined | null;
      title: string;
      createdAt: number;
    }) => {
      const postsCollection = collection(db, "Posts");
      return addDoc(postsCollection, newMd);
    },
    {
      onSuccess: () => {
        alert("게시물이 성공적으로 저장되었습니다.");
        navigate("/");
      },
    }
  );

  const handleSave = async () => {
    if (md === "" || title === "") {
      alert("내용을 입력해 주세요");
      return;
    }
    mutation.mutate({
      title: title,
      content: md,
      uid: auth.currentUser?.uid,
      displayName: auth.currentUser?.displayName,
      createdAt: now.valueOf(),
    });
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <Container>
      <TitleInput
        value={title}
        onChange={handleTitle}
        placeholder="제목을 입력하세요."
      ></TitleInput>
      {mutation.isError ? <ErrorText>에러가 발생했습니다.</ErrorText> : null}
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
