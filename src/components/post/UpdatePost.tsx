import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import { useAppSelector } from "../../hooks/dispatchHook";
import { useState } from "react";
import useGetPost from "../../hooks/postHooks/getPostHook";
import useUpdatePost from "../../hooks/postHooks/updatePostHook";
import useCheckIsLogin from "../../hooks/authHooks/checkIsLoginHook";
import SelectorComponent from "../common/SelectorComponent";

const UpdatePost = () => {
  useCheckIsLogin();
  const theme = useAppSelector((state) => state.theme);

  const { docId } = useParams();
  const { getPost } = useGetPost(docId);
  const { data } = useQuery(["getPost", docId], getPost, {
    staleTime: 3 * 60000,
  });

  const [md, setMd] = useState(data?.content);
  const [title, setTitle] = useState(data?.title);
  const [category, setCategory] = useState(data?.category);

  const { handleUpdatePost } = useUpdatePost(docId, title, md, category);

  if (typeof data === "undefined") {
    //TODO: 존재하지 않는 게시물을 조회할때 나타낼 컴포넌트 만들기
    return <div>존재하지 않는 게시물 입니다.</div>;
  }

  return (
    <Container>
      <TitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요."
      ></TitleInput>
      {/**TODO: 셀렉터 컴포넌트로 분리 */}
      <SelectorComponent category={category} setCategory={setCategory} />
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
  margin-top: 2rem;
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
