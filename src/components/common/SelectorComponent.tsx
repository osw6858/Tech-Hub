import styled from "styled-components";

interface SelectState {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const SelectorComponent = ({ category, setCategory }: SelectState) => {
  return (
    <CategorySelect
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="none">카테고리선택</option>
      <option value="React">React</option>
      <option value="JS">JS</option>
      <option value="TS">TS</option>
      <option value="HTML/CSS">HTML/CSS</option>
    </CategorySelect>
  );
};

export default SelectorComponent;

const CategorySelect = styled.select`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.cardFontColor};
  font-size: 1.6rem;
  outline: none;
  border: none;
  padding-left: 0.6rem;
  margin-bottom: 1.8rem;
  margin-top: 0.5rem;
`;
