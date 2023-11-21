import { collection, doc, updateDoc } from "firebase/firestore/lite";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { auth, db } from "../../firebase/firebaseConfig";
import MDEditor from "@uiw/react-md-editor";
import { useAppSelector } from "../../hooks/dispatchHook";
import { useEffect, useState } from "react";
import useGetPost from "../../hooks/getPostHook";

const UpdatePost = () => {
  const { docId } = useParams();

  const { getPost } = useGetPost(docId);
  const { data } = useQuery(["getPost", docId], getPost, {
    staleTime: 3 * 60000,
  });

  const [md, setMd] = useState(data?.content);
  const [title, setTitle] = useState(data?.title);

  const theme = useAppSelector((state) => state.theme);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!auth.currentUser) {
      alert("로그인이 필요합니다.");
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser]);

  const UpdateMutation = useMutation(
    (updateMd: { title: string; content: string }) => {
      const docRef = collection(db, "Posts");
      const documentRef = doc(docRef, docId);
      return updateDoc(documentRef, updateMd);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
        queryClient.invalidateQueries({ queryKey: ["getPost", docId] });
        alert("게시물이 성공적으로 수정되었습니다.");
        navigate(`/post/${docId}`);
      },
      onError: (error) => {
        console.error("게시물 수정 중 오류 발생:", error);
        navigate(`/error`);
      },
    }
  );

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleUpdatePost = async () => {
    UpdateMutation.mutate({
      title: title,
      content: md,
    });
  };

  if (typeof data === "undefined") {
    //존재하지 않는 게시물을 조회할때 나타낼 컴포넌트 만들 예정
    return <div>존재하지 않는 게시물 입니다.</div>;
  }

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
