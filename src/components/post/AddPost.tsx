import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import { useAppSelector } from "../../hooks/dispatchHook";
import { useNavigate } from "react-router-dom";
import useAddPostHook from "../../hooks/postHooks/addPostHook";
import useCheckIsLogin from "../../hooks/authHooks/checkIsLoginHook";
import { useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import SelectorComponent from "../common/SelectorComponent";
import ButtonComponent from "../common/ButtonComponent";

const AddPost = () => {
  useCheckIsLogin();
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.theme);

  const [md, setMd] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const { handleSave, addPostMutation } = useAddPostHook(
    title,
    md,
    auth.currentUser?.uid,
    category
  );

  //console.log(md);

  return (
    <Container>
      <TitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요."
      ></TitleInput>
      {/**TODO: 셀렉터 컴포넌트로 분리 */}
      <SelectorComponent category={category} setCategory={setCategory} />
      {addPostMutation.isError ? (
        <ErrorText>에러가 발생했습니다.</ErrorText>
      ) : null}
      <div className="Editor" data-color-mode={theme.dark ? "darkT" : "light"}>
        <MDEditor value={md} onChange={(e) => setMd(e || "")} height={865} />
      </div>
      <ButtonWrapper>
        <ButtonComponent clickFn={handleSave}>저장</ButtonComponent>
        <ButtonComponent clickFn={() => navigate("/")}>
          돌아가기
        </ButtonComponent>
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

const ErrorText = styled.div`
  color: red;
  font-size: 2rem;
`;
