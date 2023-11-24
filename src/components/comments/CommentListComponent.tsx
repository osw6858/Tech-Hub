import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useGetComments from "../../hooks/commentHooks/getComments";
import { CommentsState } from "../../hooks/postHooks/addPostHook";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { apiKey, db } from "../../firebase/firebaseConfig";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore/lite";

const CommentListComponent = ({ docId }: { docId: string | undefined }) => {
  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey);

  const { getPostComments } = useGetComments(docId);
  dayjs.extend(relativeTime);

  const { data } = useQuery(["getPostComments", docId], getPostComments, {
    staleTime: 3 * 60000,
  });

  const getSessionUid = () => {
    if (typeof isSession === "string") {
      const uid = JSON.parse(isSession).uid;
      return uid;
    }
  };

  const queryClient = useQueryClient();

  const removeMutation = useMutation(
    (removeComment: CommentsState) => {
      const collectionRef = collection(db, "Posts");
      const documentRef = doc(collectionRef, docId);
      return updateDoc(documentRef, {
        comments: removeComment,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getPostComments"] });
        queryClient.invalidateQueries({ queryKey: ["getPost", docId] });
        alert("삭제 성공!!");
      },
    }
  );

  const handleRemoveComment = async (
    uid: string,
    userComment: string,
    commentedAt: number
  ) => {
    const collectionRef = collection(db, "Posts");
    const documentRef = doc(collectionRef, docId);
    const docSnap = await getDoc(documentRef);

    if (docSnap.exists()) {
      const comments = docSnap.data().comments;
      const updatedComments = comments.filter(
        (comment: CommentsState) =>
          comment.uid !== uid ||
          comment.comment !== userComment ||
          comment.commentedAt !== commentedAt
      );
      removeMutation.mutate(updatedComments);
    } else {
      console.log("No such document!");
    }
  };

  return (
    <>
      {data && data.length !== 0 ? (
        data.map((comment: CommentsState) => (
          <Container
            key={`${comment.uid}/${comment.comment}/${comment.commentedAt}`}
          >
            <CommentWrapper>
              <UserInfo>
                <CommentBy>{comment.commentBy}</CommentBy>
                <CommentedAt>
                  {dayjs(comment.commentedAt).fromNow()}
                </CommentedAt>
                {getSessionUid() === comment.uid && (
                  <DeleteText
                    onClick={() =>
                      handleRemoveComment(
                        comment.uid,
                        comment.comment,
                        comment.commentedAt
                      )
                    }
                  >
                    삭제
                  </DeleteText>
                )}
              </UserInfo>
              <Comment>{comment.comment}</Comment>
            </CommentWrapper>
          </Container>
        ))
      ) : (
        <NoComment>
          <p>아직 댓글이 없습니다.</p>
        </NoComment>
      )}
    </>
  );
};

export default CommentListComponent;

const Container = styled.div`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.text};
  margin-top: 2rem;
`;

const CommentWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.contour};
  padding: 2rem;
`;

const CommentBy = styled.span`
  display: inline-block;
  font-size: 1.6rem;
  margin-bottom: 1.3rem;
`;

const UserInfo = styled.div`
  display: flex;
`;

const CommentedAt = styled.span`
  color: ${({ theme }) => theme.cardFontColor};
  font-size: 1.4rem;
  margin-left: 1.2rem;
`;

const Comment = styled.p`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const DeleteText = styled.span`
  cursor: pointer;
  font-size: 1.4rem;
  margin-left: 1.3rem;
`;

const NoComment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
  font-size: 2rem;
  border-top: 1px solid ${({ theme }) => theme.contour};

  & > p {
    margin-top: 2.5rem;
  }
`;
