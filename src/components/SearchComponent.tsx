import styled from "styled-components";

const SearchComponent = () => {
  return (
    <>
      <SearchInput placeholder="검색어를 입력해 주세요" />
    </>
  );
};

export default SearchComponent;

const SearchInput = styled.input`
  width: 85%;
  height: 5rem;
  border: 1px solid ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1.8rem;
  padding-left: 2rem;
  outline: none;

  &:focus {
    border: 2px solid ${({ theme }) => theme.text};
  }
`;
