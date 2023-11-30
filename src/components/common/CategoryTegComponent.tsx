import { useState } from "react";
import styled from "styled-components";

interface Category {
  category: string[];
  setCategory: (value: React.SetStateAction<string>) => void;
}

interface TagProps {
  $active: string;
}

const CategoryTegComponent = ({ category, setCategory }: Category) => {
  const [activeTag, setActiveTag] = useState<string>("All");

  const handleTagClick = (value: string) => {
    setCategory(value);
    setActiveTag(value);
  };

  return (
    <Container>
      {category.map((value) => (
        <Tag
          $active={activeTag === value ? "true" : "false"}
          key={value}
          onClick={() => handleTagClick(value)}
        >
          {value}
        </Tag>
      ))}
    </Container>
  );
};

export default CategoryTegComponent;

const Container = styled.div``;

const Tag = styled.span<TagProps>`
  display: inline-block;
  margin: 0.5rem 0.5rem 0.5rem 0.5rem;
  font-size: 1.5rem;
  padding: 0.8rem;
  min-width: 6rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.card};
  color: ${(props) => (props.$active === "true" ? "#b2d19d" : "none")};
  transition: all 0.2s;

  @media ${(props) => props.theme.mobile} {
    font-size: 1.2rem;
    min-width: 6rem;
  }
`;
