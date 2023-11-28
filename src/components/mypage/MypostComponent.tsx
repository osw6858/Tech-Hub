import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import LargeCardComponent from "../card/LargeCardComponent";
import useGetMyPost from "../../hooks/mypagehook/getMyPostHook";
import useCheckIsLogin from "../../hooks/authHooks/checkIsLoginHook";
import { useState } from "react";
import CategoryTegComponent from "../common/CategoryTegComponent";
import useCategory from "../../hooks/postHooks/setCategoryHook";

const MypostComponent = ({ uid }: { uid: string }) => {
  useCheckIsLogin();

  const [category, setCategory] = useState<string>("All");
  const { data, fetchNextPage, hasNextPage } = useGetMyPost(uid);

  const { result } = useCategory(data);

  return (
    <Container>
      <CategoryTegComponent
        category={["All", "React", "TS", "JS", "HTML/CSS", "none"]}
        setCategory={setCategory}
      />
      <InfiniteScroll
        style={{ overflow: "none" }}
        dataLength={data?.pages.length ? data.pages.length : 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading...</h4>}
      >
        {category === "All" ? (
          data?.pages.map((page) => {
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
          })
        ) : (
          <>
            {result && result[category] ? (
              result[category]?.map((post) => (
                <LargeCardComponent
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
  );
};

export default MypostComponent;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoPost = styled.h3`
  font-size: 3rem;
  margin-top: 3rem;
`;
