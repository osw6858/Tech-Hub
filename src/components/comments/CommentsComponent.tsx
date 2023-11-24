import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useState } from "react";
import useAddComment from "../../hooks/commentHooks/addCommentHook";
import CommentListComponent from "./CommentListComponent";

const CommentsComponent = () => {
  const { docId } = useParams();
  const [comment, setComment] = useState("");

  const { handleComments } = useAddComment(docId, comment, setComment);

  return (
    <Container onSubmit={handleComments}>
      <CommentWrapper>
        <p>Comments</p>
        <TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></TextArea>
      </CommentWrapper>
      <ButtonWrapper>
        <CommentButton type="submit">댓글작성</CommentButton>
      </ButtonWrapper>
      <CommentListComponent docId={docId} />
    </Container>
  );
};

export default CommentsComponent;

const Container = styled.form`
  margin-top: 4rem;
  padding: 2rem;
  border-top: 1px solid ${({ theme }) => theme.contour};
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > p {
    font-size: 3rem;
    margin-bottom: 2rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.cardFontColor};
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  outline: none;
  border-radius: 1rem;
  padding: 1rem;
  font-size: 1.8rem;
  height: 6.25rem;
  resize: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const CommentButton = styled.button`
  background-color: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 1.3rem;
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
