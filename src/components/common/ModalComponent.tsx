import styled from "styled-components";
import { useEffect } from "react";

interface Props {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  handlePostAndComment: () => void;
}

const ModalComoponent = ({ setModal, handlePostAndComment }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const removePostAndComment = () => {
    handlePostAndComment();
    setModal(false);
  };

  return (
    <Container>
      <ContentWrapper>
        <TextWrapper>
          <h2>정말로 삭제 하시겠습니까?</h2>
          <p>삭제한 게시물과 댓글은 복구할 수 없습니다.</p>
        </TextWrapper>
        <ButtonWrapper>
          <ConfirmButton onClick={removePostAndComment}>확인</ConfirmButton>
          <ConfirmButton onClick={() => setModal(false)}>취소</ConfirmButton>
        </ButtonWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default ModalComoponent;

const Container = styled.div`
  width: 100%;
  min-width: 36rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 200;
  top: 0;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  width: 20%;
  min-width: 30rem;
  z-index: 300;
  border: ${({ theme }) => theme.modalBorder};
  background-color: ${({ theme }) => theme.body};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
  opacity: 100;
  border-radius: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    width: 8rem;
  }
`;

const ConfirmButton = styled.button`
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

const TextWrapper = styled.div`
  display: grid;
  place-items: center;
  margin: 2.5rem;

  & > h2 {
    font-weight: 600;
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
  & > p {
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 2rem;
    color: red;
  }
`;
