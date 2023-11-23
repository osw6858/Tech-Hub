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
}

const CardComponent = ({
  content,
  docId,
  name,
  title,
  createdAt,
}: PostState) => {
  const { sumNail, contents } = useSeparate(content);

  return (
    <StyledLink to={`/post/${docId}`}>
      <Card>
        {sumNail && <Sumnail src={sumNail}></Sumnail>}

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
  height: 40rem;
  max-height: 40rem;
  max-width: 48rem;

  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media ${(props) => props.theme.mobile} {
    min-width: 23rem;
  }
`;

const Sumnail = styled.img`
  width: 100%;
  height: 18rem;
  border-radius: 0.4rem;
`;

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 1rem;
`;

const UserName = styled.div`
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
  height: 16rem;
  padding: 2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Contents = styled.div`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CreatedAt = styled.div`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.cardFontColor};
  padding: 0 2rem 0 2rem;
`;
