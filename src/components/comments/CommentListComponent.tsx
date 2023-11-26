import styled from "styled-components";
import { useQuery } from "react-query";
import useGetComments from "../../hooks/commentHooks/getComments";
import { CommentsState } from "../../hooks/postHooks/addPostHook";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { apiKey } from "../../firebase/firebaseConfig";
import useDeleteComment from "../../hooks/commentHooks/DeleteCommentHook";
import ModalComoponent from "../common/ModalComponent";
import { useState } from "react";

const CommentListComponent = ({ docId }: { docId: string | undefined }) => {
  dayjs.extend(relativeTime);

  const [modal, setModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState<CommentsState>();

  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey);

  const { getPostComments } = useGetComments(docId);
  const { handleRemoveComment } = useDeleteComment(docId);

  const { data } = useQuery(["getPostComments", docId], getPostComments, {
    staleTime: 3 * 60000,
  });

  const getSessionUid = () => {
    if (typeof isSession === "string") {
      const uid = JSON.parse(isSession).uid;
      return uid;
    }
  };

  // console.log("리렌더링발생");
  //모달이 반복문 안에 들어가 있어서 배경이 진해지는 문제가 있어서 해결은 했는데, 코드 효율적으로 잘 짠거 같진 않은거 같은 느낌
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
                    onClick={() => {
                      setSelectedComment(comment);
                      setModal(true);
                    }}
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
      {modal && selectedComment && (
        <ModalComoponent
          setModal={setModal}
          handlePostAndComment={() =>
            handleRemoveComment(
              selectedComment.uid,
              selectedComment.comment,
              selectedComment.commentedAt
            )
          }
        />
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
  padding: 1rem;
`;

const CommentBy = styled.span`
  color: ${({ theme }) => theme.cardFontColor};
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 600;
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
  font-size: 1.6rem;
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
