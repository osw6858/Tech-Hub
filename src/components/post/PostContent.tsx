import MDEditor from "@uiw/react-md-editor";
import {
  DocumentData,
  DocumentReference,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";
import { useNavigate, useParams } from "react-router-dom";
import { apiKey, db } from "../../firebase/firebaseConfig";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/dispatchHook";
import useGetPost from "../../hooks/getPostHook";

const PostContent = () => {
  const navigate = useNavigate();

  const { docId } = useParams();
  const { getPost } = useGetPost(docId);
  const { data } = useQuery(["getPost", docId], getPost);

  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey);

  const queryClient = useQueryClient();
  const theme = useAppSelector((state) => state.theme);

  const deleteMutation = useMutation(
    (removePost: DocumentReference<DocumentData, DocumentData>) => {
      return deleteDoc(removePost);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllPost");
        navigate(`/`);
        alert("게시물이 성공적으로 삭제되었습니다.");
      },
      onError: (error) => {
        console.error("게시물 삭제 중 오류 발생:", error);
        navigate(`/error`);
      },
    }
  );

  const handleUpdatePost = () => {
    navigate(`/rewrite/${docId}`);
  };

  const isPostedUser = () => {
    if (typeof isSession === "string") {
      const uid = JSON.parse(isSession).uid;
      if (uid === data?.uid) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleRemovePost = () => {
    const docRef = collection(db, "Posts");
    const documentRef = doc(docRef, docId);
    deleteMutation.mutate(documentRef);
  };

  if (typeof data === "undefined") {
    //존재하지 않는 게시물을 조회할때 나타낼 컴포넌트 만들 예정
    return <div>존재하지 않는 게시물 입니다.</div>;
  }

  return (
    <Wrapper>
      {isPostedUser() && (
        <UpdateDelete>
          <UpdateText onClick={handleUpdatePost}>수정</UpdateText>{" "}
          <DeleteText onClick={handleRemovePost}>삭제</DeleteText>
        </UpdateDelete>
      )}
      {data && (
        <>
          <PostTitle>{data.title}</PostTitle>
          <div data-color-mode={theme.dark ? "darkT" : "light"}>
            <MDEditor.Markdown
              source={data.content}
              style={{
                whiteSpace: "pre-wrap",
                transition: "all 0.3s",
              }}
            />
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default PostContent;

const Wrapper = styled.div`
  height: 100%;
  width: 60%;
  margin: 0 auto;
  margin-bottom: 5rem;

  @media ${(props) => props.theme.laptop} {
    width: 80%;
  }

  @media ${(props) => props.theme.tablet} {
    width: 95%;
  }

  @media ${(props) => props.theme.mobile} {
    width: 95%;
  }
`;

const PostTitle = styled.h2`
  font-size: 5rem;
  font-weight: 700;
  margin: 2rem 0 3rem 0;
`;

const UpdateDelete = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const UpdateText = styled.span`
  cursor: pointer;
  font-size: 1.5rem;

  &::after {
    content: "";
    display: inline-block;
    height: 1.2rem;
    border: 1px solid ${({ theme }) => theme.text};
    margin: 0 1.3rem 0 1.3rem;
    transform: rotate(15deg);
  }
`;

const DeleteText = styled.span`
  cursor: pointer;
  font-size: 1.5rem;
`;
