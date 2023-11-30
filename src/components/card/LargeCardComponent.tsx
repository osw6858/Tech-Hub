import { Link } from "react-router-dom";
import styled from "styled-components";
import useSeparate from "../../hooks/separateHook";
import dayjs from "dayjs";

interface PostState {
  content: string;
  docId: string;
  name: string;
  title: string;
  createdAt: number;
  category: string;
}

const LargeCardComponent = ({
  content,
  docId,
  name,
  title,
  createdAt,
}: // category,
PostState) => {
  const { thumbnail, contents } = useSeparate(content);

  return (
    <StyledLink to={`/post/${docId}`}>
      <Card>
        {thumbnail && <Thumbnail src={thumbnail} alt="Thumbnail"></Thumbnail>}
        <Title>{title}</Title>
        <Contents> {contents}</Contents>
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

LargeCardComponent;

export default LargeCardComponent;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Card = styled.div`
  min-width: 39vw;
  min-height: 40rem;
  border: ${({ theme }) => theme.cardBorder};
  padding: 4rem;
  margin-top: 2rem;
  transition: transform 0.2s ease-in-out;

  @media ${(props) => props.theme.tablet} {
    min-width: 80vw;
  }

  @media ${(props) => props.theme.mobile} {
    min-width: 80vw;
    padding: 2rem;
  }

  &:hover {
    transform: scale(1.01);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
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
  font-size: 2.8rem;
  font-weight: 800;
  margin: 2rem 0 2.5rem 0;

  @media ${(props) => props.theme.mobile} {
    font-size: 2.4rem;
  }
`;

const Contents = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media ${(props) => props.theme.mobile} {
    font-size: 1.7rem;
  }
`;

const CreatedAt = styled.div`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.cardFontColor};
  margin-top: 4rem;
`;

const UserName = styled.div`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.text};
  margin-top: 0.8rem;
  font-weight: 800;

  & > span {
    color: ${({ theme }) => theme.cardFontColor};
  }
`;
