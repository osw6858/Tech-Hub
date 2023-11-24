import MDEditor from "@uiw/react-md-editor";
import { useNavigate, useParams } from "react-router-dom";
import { apiKey } from "../../firebase/firebaseConfig";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/dispatchHook";
import useGetPost from "../../hooks/postHooks/getPostHook";
import useRemovePost from "../../hooks/postHooks/removePostHook";
import dayjs from "dayjs";
import CommentsComponent from "../comments/CommentsComponent";

const PostContent = () => {
  const theme = useAppSelector((state) => state.theme);
  const navigate = useNavigate();

  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey);

  const { docId } = useParams();
  const { handleRemovePost } = useRemovePost(docId);
  const { getPost } = useGetPost(docId);

  const { data } = useQuery(["getPost", docId], getPost, {
    staleTime: 3 * 60000,
    onError: (error) => {
      console.error(`${error} 에러발생`);
    },
  });

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
          {data.displayName ? (
            <PostWriter>
              <span>Posted by</span> {data.displayName}
            </PostWriter>
          ) : (
            <PostWriter>
              <span>Posted by</span> 익명
            </PostWriter>
          )}

          <CreatedAt>
            {dayjs(data.createdAt).format("YYYY년 MM월 DD일")}
          </CreatedAt>
          <CommentsComponent />
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
  @media ${(props) => props.theme.mobile} {
    font-size: 4.2rem;
  }
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

const PostWriter = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-top: 10rem;
  padding-top: 3rem;
  border-top: 1px solid ${({ theme }) => theme.contour};

  & > span {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.cardFontColor};
    font-weight: 500;
  }
`;

const CreatedAt = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.cardFontColor};
  margin-top: 2rem;
`;
