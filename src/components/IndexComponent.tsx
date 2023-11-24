import styled from "styled-components";
import SmallCardComponent from "./card/SmallCardComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton } from "antd";
import useGetAllPosts from "../hooks/postHooks/getAllPostHook";

const IndexComponent = () => {
  const { data, fetchNextPage, hasNextPage, status } = useGetAllPosts();

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
        <Container>
          <InfiniteScroll
            style={{ overflow: "none" }}
            dataLength={data?.pages.length ? data?.pages.length : 0}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<Loading>Loading...</Loading>}
          >
            {data?.pages.map((page) => {
              return page.posts.map((post) => {
                return (
                  <SmallCardComponent
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
    grid-template-columns: repeat(5, 1fr);
    overflow: hidden;
    gap: 2rem;

    @media ${(props) => props.theme.laptop} {
      grid-template-columns: repeat(3, 1fr);
    }

    @media ${(props) => props.theme.tablet} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media ${(props) => props.theme.mobile} {
      grid-template-columns: repeat(1, 1fr);
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
