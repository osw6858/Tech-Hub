import CardComponent from "./main/CardComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetSearchedPostHook from "../hooks/getSearchedPostHook";
import { useState } from "react";
import styled from "styled-components";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  //const [keyword, setKeyword] = useState("");

  const { data, fetchNextPage, hasNextPage } =
    useGetSearchedPostHook(searchQuery);

  return (
    <Container>
      <SearchInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="검색어를 입력하세요."
      />
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
              <CardComponent
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
  & > a > div {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 60%;
  height: 5rem;
  border: 1px solid ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1.8rem;
  padding-left: 2rem;
  outline: none;
`;
