import MDEditor from "@uiw/react-md-editor";
import {
  DocumentData,
  DocumentReference,
  collection,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore/lite";
import { useNavigate, useParams } from "react-router-dom";
import { apiKey, db } from "../../firebase/firebaseConfig";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/dispatchHook";

const PostContent = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey);

  const query = useQuery(["getPost", docId], getPost);
  const queryClient = useQueryClient();

  const theme = useAppSelector((state) => state.theme);

  const deleteMutation = useMutation(
    (removePost: DocumentReference<DocumentData, DocumentData>) => {
      return deleteDoc(removePost);
    },
    {
      onSuccess: () => {
        alert("게시물이 성공적으로 삭제되었습니다.");
        queryClient.invalidateQueries("getAllPost");
        navigate(`/`);
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

  const handleUpdatePost = () => {
    navigate(`/rewrite/${docId}`);
  };

  const isPostedUser = () => {
    if (typeof isSession === "string") {
      const uid = JSON.parse(isSession).uid;
      if (uid === query.data?.uid) {
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

  return (
    <Wrapper>
      {isPostedUser() && (
        <div>
          <button onClick={handleUpdatePost}>수정</button>{" "}
          <button onClick={handleRemovePost}>삭제</button>
        </div>
      )}
      {query.data && (
        <div data-color-mode={theme.dark ? "darkT" : "light"}>
          <MDEditor.Markdown
            source={query.data.content}
            style={{
              whiteSpace: "pre-wrap",
              transition: "all 0.3s",
            }}
          />
        </div>
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
