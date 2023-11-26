import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import LargeCardComponent from "../card/LargeCardComponent";
import useGetMyPost from "../../hooks/mypagehook/getMyPostHook";
import useCheckIsLogin from "../../hooks/authHooks/checkIsLoginHook";

const MypostComponent = ({ uid }: { uid: string }) => {
  useCheckIsLogin();

  const { data, fetchNextPage, hasNextPage } = useGetMyPost(uid);

  return (
    <Container>
      <InfiniteScroll
        style={{ overflow: "none" }}
        dataLength={data?.pages.length ? data?.pages.length : 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading...</h4>}
      >
        {data?.pages.map((page) => {
          return page.posts.map((post) => {
            return (
              <LargeCardComponent
                key={post.docID}
                content={post.postData.content}
                name={post.postData.displayName}
                title={post.postData.title}
                docId={post.docID}
                createdAt={post.postData.createdAt}
                category={post.postData.category}
              />
            );
          });
        })}
      </InfiniteScroll>
    </Container>
  );
};

export default MypostComponent;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
