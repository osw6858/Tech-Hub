import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
import { InfiniteData } from "react-query";

type Category = {
  [key: string]: { postData: DocumentData; docId: string }[];
};

type PostData = {
  postData: DocumentData;
  docId: string;
};

type QueryData =
  | InfiniteData<{
      posts: {
        docID: string;
        postData: DocumentData;
      }[];
      lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData>;
    }>
  | undefined;

const useCategory = (data: QueryData) => {
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

  return { result };
};

export default useCategory;
