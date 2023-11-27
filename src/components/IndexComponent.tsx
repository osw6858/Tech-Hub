import styled from "styled-components";
import SmallCardComponent from "./card/SmallCardComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";
import useGetAllPosts from "../hooks/postHooks/getAllPostHook";
import { DocumentData } from "firebase/firestore/lite";
import CategoryTegComponent from "./common/CategoryTegComponent";
import { useState } from "react";

type Category = {
  [key: string]: { postData: DocumentData; docId: string }[];
};

type PostData = {
  postData: DocumentData;
  docId: string;
};

const IndexComponent = () => {
  const [category, setCategory] = useState<string>("All");

  const { data, fetchNextPage, hasNextPage, status } = useGetAllPosts();

  const post = data?.pages
    .map((page) =>
      page.posts.map((post) => ({
        postData: post.postData,
        docId: post.docID,
      }))
    )
    .flat();

  // 카테고리별 분류작업
  const result = post?.reduce((acc: Category, cur: PostData) => {
    const category = cur.postData.category;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(cur);

    return acc;
  }, {});

  return (
    <>
      {status === "loading" ? (
        <Wrapper>
          <div>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </div>
        </Wrapper>
      ) : (
        <>
          <div>
            <CategoryTegComponent
              category={["All", "React", "TS", "JS", "HTML/CSS", "none"]}
              setCategory={setCategory}
            />
          </div>
          <Container>
            <InfiniteScroll
              style={{ overflow: "none" }}
              dataLength={data?.pages.length ? data?.pages.length : 0}
              next={fetchNextPage}
              hasMore={!!hasNextPage}
              loader={<Loading>Loading...</Loading>}
            >
              {category === "All" ? (
                data?.pages.map((page) => {
                  return page.posts.map((post) => {
                    return (
                      <SmallCardComponent
                        key={post.docID}
                        content={post.postData.content}
                        name={post.postData.displayName}
                        title={post.postData.title}
                        docId={post.docID}
                        category={post.postData.category}
                        createdAt={post.postData.createdAt}
                      />
                    );
                  });
                })
              ) : (
                <>
                  {result && result[category] ? (
                    result[category]?.map((post) => (
                      <SmallCardComponent
                        key={post.docId}
                        content={post.postData.content}
                        name={post.postData.displayName}
                        title={post.postData.title}
                        docId={post.docId}
                        createdAt={post.postData.createdAt}
                        category={post.postData.category}
                      />
                    ))
                  ) : (
                    <NoPost>작성한 포스트가 없습니다.</NoPost>
                  )}
                </>
              )}
            </InfiniteScroll>
          </Container>
        </>
      )}
    </>
  );
};

export default IndexComponent;

const Container = styled.div`
  & > div > .infinite-scroll-component {
    display: grid;
    grid-template-columns: repeat(5, minmax(10rem, 1fr));
    overflow: hidden;
    gap: 2rem;

    @media ${(props) => props.theme.laptop} {
      grid-template-columns: repeat(3, minmax(10rem, 1fr));
    }

    @media ${(props) => props.theme.tablet} {
      grid-template-columns: repeat(2, minmax(10rem, 1fr));
    }

    @media ${(props) => props.theme.mobile} {
      grid-template-columns: repeat(1, minmax(10rem, 1fr));
    }
  }
`;

const Loading = styled.h4`
  color: ${({ theme }) => theme.cardFontColor};
  font-size: 1.8rem;
  margin-top: 3rem;
  font-weight: 700;
`;

const Wrapper = styled.div`
  height: 100vh;
  & > div {
    margin-top: 10rem;
    @media ${(props) => props.theme.mobile} {
      margin-top: 5rem;
    }
    & > div {
      margin-top: 5rem;
    }
  }
`;

const NoPost = styled.h3`
  font-size: 3rem;
  margin-top: 3rem;
`;
