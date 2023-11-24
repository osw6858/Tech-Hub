import InfiniteScroll from "react-infinite-scroll-component";
import useGetSearchedPostHook from "../hooks/postHooks/getSearchedPostHook";
import { useState } from "react";
import styled from "styled-components";
import LargeCardComponent from "./card/LargeCardComponent";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  //const [keyword, setKeyword] = useState("");

  const { data, fetchNextPage, hasNextPage } =
    useGetSearchedPostHook(searchQuery);

  return (
    <Container>
      <SearchWrapper>
        <StyledSvg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </StyledSvg>
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="검색어를 입력하세요."
        />
      </SearchWrapper>
      <InfiniteScroll
        style={{ overflow: "none" }}
        dataLength={data?.pages.length ? data?.pages.length : 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading...</h4>}
      >
        {data?.pages.map((page) => {
          return page.searchedPost.map((post) => {
            return (
              <LargeCardComponent
                key={post.docID}
                content={post.postData.content}
                name={post.postData.displayName}
                title={post.postData.title}
                docId={post.docID}
                createdAt={post.postData.createdAt}
              />
            );
          });
        })}
        <></>
      </InfiniteScroll>
    </Container>
  );
};

export default SearchComponent;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${(props) => props.theme.laptop} {
    width: 100%;
  }

  @media ${(props) => props.theme.tablet} {
    width: 100%;
  }

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  height: 5rem;
  border: 1px solid ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1.8rem;
  padding-left: 5.8rem;
  outline: none;
`;

const StyledSvg = styled.svg`
  position: relative;
  top: 3.9rem;
  left: 0.5rem;
  min-width: 2.5rem;
  min-height: 2.5rem;
  transition: all 0.3s;
  fill: currentColor;
  margin: 0 1.1rem 0 1.1rem;

  @media ${(props) => props.theme.mobile} {
    margin: 0 0.8rem 0 0.8rem;
    min-width: 2.6rem;
    min-height: 2.6rem;
  }
`;
