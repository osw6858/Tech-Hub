import styled from "styled-components";
import CardComponent from "./CardComponent";
import { useInfiniteQuery } from "react-query";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore/lite";
import { db } from "../../firebase/firebaseConfig";
import InfiniteScroll from "react-infinite-scroll-component";

const IndexComponent = () => {
  const getPosts = async ({ pageParam = null }) => {
    let dbQuery = query(
      collection(db, "Posts"),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    if (pageParam) {
      dbQuery = query(
        collection(db, "Posts"),
        orderBy("createdAt", "desc"),
        startAfter(pageParam),
        limit(5)
      );
    }
    const querySnapshot = await getDocs(dbQuery);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    const posts = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return { docID: doc.id, postData: data };
    });

    return { posts, lastVisible };
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["getAllPosts"],
    getPosts,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.lastVisible; //이 반환값이 getPosts함수의 매개변수로 전달됨
      },
    }
  );

  return (
    <Container>
      <InfiniteScroll
        style={{ overflow: "none" }}
        dataLength={data?.pages.length ? data?.pages.length : 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Loading>Loading...</Loading>}
        endMessage={
          <EndMsg>
            <b>모든 포스팅을 보았습니다.</b>
          </EndMsg>
        }
      >
        {data?.pages.map((page) => {
          return page.posts.map((post) => (
            <CardComponent
              key={post.docID}
              content={post.postData.content}
              // name={post.postData.displayName}
              title={post.postData.title}
              docId={post.docID}
              createdAt={post.postData.createdAt}
            />
          ));
        })}
      </InfiniteScroll>
    </Container>
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

const EndMsg = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.text};
  margin-top: 3rem;
  font-weight: 700;
`;

const Loading = styled.h4`
  color: ${({ theme }) => theme.cardFontColor};
  font-size: 1.8rem;
  margin-top: 3rem;
  font-weight: 700;
`;
