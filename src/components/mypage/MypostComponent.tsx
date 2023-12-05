import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import LargeCardComponent from "../card/LargeCardComponent";
import useGetMyPost from "../../hooks/mypagehook/getMyPostHook";
import useCheckIsLogin from "../../hooks/authHooks/checkIsLoginHook";
import { useState } from "react";
import CategoryTegComponent from "../common/CategoryTegComponent";
import useCategory from "../../hooks/postHooks/setCategoryHook";
import { Result } from "antd";

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
        loader={null}
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
              <NoPost>
                <Result title={<ResulTitle>게시글이 없습니다.</ResulTitle>} />
              </NoPost>
            )}
          </>
        )}
      </InfiniteScroll>
    </Container>
  );
};

export default MypostComponent;

const Container = styled.div`
  display: grid;
  place-items: center;
`;

const NoPost = styled.div`
  margin-top: 5rem;
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
