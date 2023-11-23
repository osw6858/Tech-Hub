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
}

const LargeCardComponent = ({
  content,
  docId,
  //name,
  title,
  createdAt,
}: PostState) => {
  const { sumNail, contents } = useSeparate(content);

  return (
    <StyledLink to={`/post/${docId}`}>
      <Card>
        {sumNail && <Sumnail src={sumNail}></Sumnail>}
        <Title>{title}</Title>
        <Contents> {contents}</Contents>
        <CreatedAt>{dayjs(createdAt).format("YYYY년 MM월 DD일")}</CreatedAt>
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
  width: 100%;
  max-width: 85rem;
  border: ${({ theme }) => theme.cardBorder};
  padding: 2rem;
  margin-top: 2rem;
  min-height: 40rem;

  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.01);
  }
`;

const Sumnail = styled.img`
  width: 100%;
  min-height: 30rem;
  max-height: 30rem;
  object-fit: contain;
`;

const Title = styled.p`
  font-size: 2.8rem;
  font-weight: 800;
  margin: 1rem 0 2.5rem 0;
`;

const Contents = styled.div`
  font-size: 1.8rem;
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
  margin-top: 1rem;
`;
