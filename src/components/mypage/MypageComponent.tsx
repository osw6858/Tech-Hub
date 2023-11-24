import styled from "styled-components";

const MyPageComponent = () => {
  return (
    <Container>
      <p>Profile</p>
      <Profile>
        <div>
          <InfoLabel>닉네임</InfoLabel>
          <InfoValue>더미이름</InfoValue>
        </div>
        <div>
          <InfoLabel>이메일</InfoLabel>
          <InfoValue>더미Email</InfoValue>
        </div>
      </Profile>
    </Container>
  );
};

export default MyPageComponent;

const Container = styled.div`
  height: 100%;
  width: 60%;
  margin: 0 auto;
  margin-bottom: 5rem;

  & > p {
    font-size: 5rem;
    max-width: 20rem;
    margin: 0 auto;
    text-align: center;
    font-weight: 700;
  }

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

const Profile = styled.div`
  height: 20rem;
  border-bottom: 1px solid ${({ theme }) => theme.contour};
  color: ${({ theme }) => theme.text};
  margin-top: 3rem;
  display: grid;
`;

const InfoLabel = styled.span`
  display: inline-block;
  font-size: 2rem;
  color: ${({ theme }) => theme.cardFontColor};
  margin-bottom: 1rem;
`;

const InfoValue = styled.div`
  font-size: 3rem;
  font-weight: 600;
`;
