import { collection, doc, getDoc, updateDoc } from "firebase/firestore/lite";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebase/firebaseConfig";
import MDEditor from "@uiw/react-md-editor";
import { useAppSelector } from "../../hooks/dispatchHook";
import { useState } from "react";

const UpdatePost = () => {
  const { docId } = useParams();
  const query = useQuery(["getPost", docId], getPost);

  const [md, setMd] = useState(query.data?.content);
  const [title, setTitle] = useState("");

  const theme = useAppSelector((state) => state.theme);
  const navigate = useNavigate();

  const UpdateMutation = useMutation(
    (updateMd: { title: string; content: string }) => {
      const docRef = collection(db, "Posts");
      const documentRef = doc(docRef, docId);
      return updateDoc(documentRef, updateMd);
    },
    {
      onSuccess: () => {
        alert("게시물이 성공적으로 수정되었습니다.");
        navigate(`/post/${docId}`);
      },
    }
  );

  async function getPost() {
    try {
      const docRef = collection(db, "Posts");
      const documentRef = doc(docRef, docId);
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        const documentData = documentSnapshot.data();
        return documentData;
      } else {
        console.log("문서가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("문서를 가져오는 도중 오류 발생:", error);
    }
  }

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleUpdatePost = async () => {
    UpdateMutation.mutate({
      title: title,
      content: md,
    });
  };

  return (
    <Container>
      <TitleInput
        value={title}
        onChange={handleTitle}
        placeholder="제목을 입력하세요."
      ></TitleInput>
      <Wrapper>
        <div data-color-mode={theme.dark ? "darkT" : "light"}>
          <MDEditor value={md} onChange={(e) => setMd(e || "")} height={865} />
        </div>
      </Wrapper>
      <ButtonWrapper>
        <SaveButton onClick={handleUpdatePost}>수정</SaveButton>
      </ButtonWrapper>
    </Container>
  );
};

export default UpdatePost;

const Container = styled.div`
  display: grid;
`;

const Wrapper = styled.div`
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

const ButtonWrapper = styled.div`
  display: flex;
`;

const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
`;
