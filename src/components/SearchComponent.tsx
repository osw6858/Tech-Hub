import {
  collection,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
} from "firebase/firestore/lite";
import styled from "styled-components";
import { db } from "../firebase/firebaseConfig";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import useQueryDebounce from "../hooks/useQueryDebounce";
import CardComponent from "./main/CardComponent";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  //const [keyword, setKeyword] = useState("");

  const debouncedhInput = useQueryDebounce(searchQuery, 500);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["searchedPost", debouncedhInput],
    searchPost,
    {
      enabled: !!debouncedhInput,
      staleTime: 3 * 6000,
      getNextPageParam: (lastPage) => {
        return lastPage.lastVisible;
      },
    }
  );

  async function searchPost({ pageParam = null }) {
    let dbQuery = query(
      collection(db, "Posts"),
      orderBy("title"), // 제목 정렬
      startAt(debouncedhInput),
      endAt(debouncedhInput + "\uf8ff"),
      // \uf8ff 유니코드 범위에서 상당히 높은 코드 포인트이기 때문에 검색하고자 하는 키워드 뒤에 어떠한 문자열이 와도 쿼리 범위 내에 있도록 해주기 때문
      limit(5)
    );

    if (pageParam) {
      dbQuery = query(
        collection(db, "Posts"),
        orderBy("title"), // 제목 정렬
        startAt(debouncedhInput),
        endAt(debouncedhInput + "\uf8ff"),
        startAfter(pageParam),
        limit(5)
      );
    }

    const querySnapshot = await getDocs(dbQuery);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const searchedPost = querySnapshot.docs.map((doc) => {
      const postData = doc.data();
      const docID = doc.id;
      return { docID, postData };
    });
    return { searchedPost, lastVisible };
  }

  //console.log(data);

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
