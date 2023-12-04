import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import { useAppSelector } from "../../hooks/dispatchHook";
import { useState } from "react";
import useGetPost from "../../hooks/postHooks/getPostHook";
import useUpdatePost from "../../hooks/postHooks/updatePostHook";
import useCheckIsLogin from "../../hooks/authHooks/checkIsLoginHook";
import SelectorComponent from "../common/SelectorComponent";
import ButtonComponent from "../common/ButtonComponent";

const UpdatePost = () => {
  useCheckIsLogin();
  const navigate = useNavigate();
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

  return (
    <Container>
      <TitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요."
      ></TitleInput>
      {/**TODO: 셀렉터 컴포넌트로 분리 */}
      <SelectorComponent category={category} setCategory={setCategory} />
      <div data-color-mode={theme.dark ? "darkT" : "light"}>
        <MDEditor value={md} onChange={(e) => setMd(e || "")} height={865} />
      </div>
      <ButtonWrapper>
        <ButtonComponent clickFn={handleUpdatePost}>수정</ButtonComponent>
        <ButtonComponent clickFn={() => navigate("/")}>
          돌아가기
        </ButtonComponent>
      </ButtonWrapper>
    </Container>
  );
};

export default UpdatePost;

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
  width: 95%;
  transition: all 0.3s;

  @media ${(props) => props.theme.mobile} {
    font-size: 2.8rem;
    padding-left: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
`;
