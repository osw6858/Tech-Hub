import styled from "styled-components";
import SmallCardComponent from "./card/SmallCardComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetAllPosts from "../hooks/postHooks/getAllPostHook";
import CategoryTegComponent from "./common/CategoryTegComponent";
import { useState } from "react";
import useCategory from "../hooks/postHooks/setCategoryHook";
import SkeletonComponent from "./loading/SkeletonComponent";
import { Result } from "antd";

const IndexComponent = () => {
  const [category, setCategory] = useState<string>("All");

  const { data, fetchNextPage, hasNextPage, status } = useGetAllPosts();

  const { result } = useCategory(data);

  return (
    <>
      <CategoryTegComponent
        category={["All", "React", "TS", "JS", "HTML/CSS", "none"]}
        setCategory={setCategory}
      />
      {status === "loading" ? (
        <Wrapper>
          <SkeletonComponent iterateNum={4} />
        </Wrapper>
      ) : (
        <Container>
          <InfiniteScroll
            style={{ overflow: "none" }}
            dataLength={data?.pages.length ? data?.pages.length : 0}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={null}
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
                  <NoPost>
                    <Result
                      title={<ResulTitle>게시글이 없습니다.</ResulTitle>}
                    />
                  </NoPost>
                )}
              </>
            )}
          </InfiniteScroll>
        </Container>
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

const NoPost = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);

  & svg {
    fill: #b2d19d;
  }
`;

const ResulTitle = styled.span`
  color: ${({ theme }) => theme.text};

  @media ${(props) => props.theme.mobile} {
    font-size: 1.4rem;
    font-weight: 600;
  }
`;
