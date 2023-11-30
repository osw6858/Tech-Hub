import { useState } from "react";
import styled from "styled-components";
import useUpdateNickName from "../../hooks/mypagehook/updateNicknameHook";
import AuthInputComponent from "../auth/AuthInputComponent";
import { apiKey } from "../../firebase/firebaseConfig";
import ModalComoponent from "../common/ModalComponent";
import useWithdrawal from "../../hooks/authHooks/withdrawalHook";

interface UpdateState {
  setUpdate: (value: React.SetStateAction<boolean>) => void;
  update: boolean;
}

const UserInfoComponent = ({ setUpdate, update }: UpdateState) => {
  const [nickName, setNickName] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [modal, setModal] = useState(false);

  const session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const session = sessionStorage.getItem(`${session_key}`);

  const { handleUpdateNickName } = useUpdateNickName(
    nickName,
    setUpdate,
    setNickName
  );

  const { withdrawalUser } = useWithdrawal();

  if (!session) {
    return null;
  }
  const user = JSON.parse(session);
  return (
    <UserInfoWrapper onClick={(e) => e.stopPropagation()}>
      {modal && (
        <ModalComoponent
          setModal={setModal}
          title="회원탈퇴 하시겠습니까?"
          content="작성했던 게시물이 전부 삭제됩니다."
          handlePostAndComment={() => withdrawalUser()}
        />
      )}
      <div>
        {update ? null : <InfoTitle>닉네임</InfoTitle>}
        {update ? (
          <AuthInputComponent
            id={"nickName"}
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            placeholder={"변경할 닉네임 입력"}
            type={"text"}
          />
        ) : (
          <NickNameWrapper>
            <Info onClick={() => setDropDown(true)}>
              {"displayName" in user ? user.displayName : "익명"}
            </Info>
            {dropDown && (
              <DropDown>
                <button onClick={() => setModal(true)} style={{ color: "red" }}>
                  회원탈퇴
                </button>
                <button onClick={() => setDropDown(false)}>닫기</button>
              </DropDown>
            )}
          </NickNameWrapper>
        )}
      </div>
      {update ? (
        <UpdateButton onClick={handleUpdateNickName}>저장</UpdateButton>
      ) : (
        <UpdateButton onClick={() => setUpdate(true)}>수정</UpdateButton>
      )}
    </UserInfoWrapper>
  );
};

export default UserInfoComponent;

const UserInfoWrapper = styled.div`
  margin-top: 5rem;
  border-bottom: 1px solid ${({ theme }) => theme.contour};
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div > input {
    margin: 0 0 0 0;
  }

  @media ${(props) => props.theme.mobile} {
    padding: 0 0 3rem 0;
  }
`;

const InfoTitle = styled.span`
  font-size: 2rem;
  font-weight: 600;
  margin-right: 2rem;
`;

const Info = styled.span`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.cardFontColor};
`;

const UpdateButton = styled.button`
  background-color: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 1.3rem;
  border: 1xp solid gray;
  font-weight: 600;
  outline: none;
  padding: 1rem;
  min-width: 6rem;
  transition: all 0.2s;
  margin: 0 0.3rem 0 0.3rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }

  @media ${(props) => props.theme.mobile} {
    padding: 0.3rem;
  }
`;

const NickNameWrapper = styled.div`
  display: inline;
  position: relative;
  cursor: pointer;
`;

const DropDown = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.body};
  border: 3px solid ${({ theme }) => theme.dropDownBorder};
  width: 13rem;
  height: 9rem;
  left: -2rem;
  margin-top: 1.5rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > button {
    font-size: 1.3rem;
    background-color: inherit;
    color: inherit;
    font-weight: 800;
    border: none;
    border-radius: 1rem;
    padding: 0.8rem;
    cursor: pointer;
  }

  &::before {
    content: "";
    border: 1px solid ${({ theme }) => theme.dropDownBorder};
    position: absolute;
    top: -2rem;
    left: 50%;
    transform: translateX(-50%);
    border-width: 1rem;
    border-style: solid;
    border-color: transparent transparent ${({ theme }) => theme.dropDownBorder}
      transparent;
  }
`;
