import { Link } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import useSeparate from "../../hooks/separateHook";

interface PostState {
  content: string;
  docId: string;
  name: string;
  title: string;
  createdAt: number;
  category: string;
}

const CardComponent = ({
  content,
  docId,
  name,
  title,
  createdAt,
}: //category,
PostState) => {
  const { thumbnail, contents } = useSeparate(content);

  return (
    <StyledLink to={`/post/${docId}`}>
      <Card>
        {thumbnail && <Thumbnail src={thumbnail} alt="Thumbnail"></Thumbnail>}

        <PostInfo>
          <Title>{title}</Title>
          <Contents> {contents}</Contents>
        </PostInfo>
        <CreatedAt>{dayjs(createdAt).format("YYYY년 MM월 DD일")}</CreatedAt>
        {name ? (
          <UserName>
            <span>by</span> {name}
          </UserName>
        ) : (
          <UserName>
            <span>by</span> 익명
          </UserName>
        )}
      </Card>
    </StyledLink>
  );
};

export default CardComponent;

const Card = styled.div`
  background-color: ${({ theme }) => theme.card};
  border: ${({ theme }) => theme.cardBorder};
  border-radius: 0.4rem;
  margin-top: 2rem;
  height: 100%;
  max-width: 48rem;
  padding-bottom: 2rem;

  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media ${(props) => props.theme.mobile} {
    min-width: 23rem;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.4rem;
  object-fit: cover;
  @supports (aspect-ratio: 16 / 9) {
    aspect-ratio: 16 / 9;
  }

  @supports not (aspect-ratio: 16 / 9) {
    &:before {
      float: left;
      padding-top: 56.25%; /* 16:9 비율 */
      content: "";
    }
    &:after {
      display: block;
      content: "";
      clear: both;
    }
  }
`;

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 1rem;
`;

const UserName = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  padding: 0 2rem 0 2rem;
  margin-top: 0.8rem;
  font-weight: 800;

  & > span {
    color: ${({ theme }) => theme.cardFontColor};
  }
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 14rem;
  padding: 1.7rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Contents = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.3;
  font-weight: 200;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CreatedAt = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.cardFontColor};
  padding: 0 2rem 0 2rem;
`;
