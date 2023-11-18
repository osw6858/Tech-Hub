import styled from "styled-components";
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
        <div data-color-mode={theme.dark ? "darkT" : "light"}>
          <MDEditor value={md} onChange={(e) => setMd(e || "")} height={865} />
          {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
        </div>
      </Wrapper>
      <ButtonWrapper>
        <SaveButton onClick={handleSave}>저장</SaveButton>
      </ButtonWrapper>
    </Container>
  );
};

export default AddPost;

const Container = styled.div`
  display: grid;
  margin-top: 5rem;
`;

const TitleInput = styled.input`
  height: 8rem;
  background-color: ${({ theme }) => theme.body};
  border: none;
  outline: none;
  font-size: 4rem;
  color: ${({ theme }) => theme.text};
  padding-left: 1rem;
`;

const Wrapper = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
`;

const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
`;

const ErrorText = styled.div`
  color: red;
  font-size: 2rem;
`;
