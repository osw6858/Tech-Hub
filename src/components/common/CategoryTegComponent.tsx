import styled from "styled-components";

interface Category {
  category: string[];
  setCategory: (value: React.SetStateAction<string>) => void;
}

const CategoryTegComponent = ({ category, setCategory }: Category) => {
  return (
    <Container>
      {category.map((value) => (
        <Tag key={value} onClick={() => setCategory(value)}>
          {value}
        </Tag>
      ))}
    </Container>
  );
};

export default CategoryTegComponent;

const Container = styled.div``;

const Tag = styled.span`
  display: inline-block;
  margin: 0 1rem 0 1rem;
  font-size: 1.5rem;
  padding: 0.8rem;
  min-width: 6rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  border-radius: 2rem;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.card};

  @media ${(props) => props.theme.mobile} {
    margin: 0.5rem 0.5rem 0.5rem 0.5rem;
  }
`;
